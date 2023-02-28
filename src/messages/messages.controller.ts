import { ConnectedSocket ,WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';

import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Controller, OnModuleInit, UseGuards } from '@nestjs/common';            // YMP
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@WebSocketGateway(/*3001,*/{ 
  cors: { origin: ['http://localhost:3000'],        // YMP
          //origin: '*', 
          //transports: ['websocket']
        },
})

@Controller('')
export class MessagesController implements OnModuleInit {       //  YMP

  constructor(
    private readonly messagesService: MessagesService,
    //private authService: AuthService
            ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {                                          
    this.server.on('connection', (socket) => {              
    //socket.data = {password: "секретный и лысый", email: "непейлысый@gmail.com"};      // YMP
    console.log(`Connected, socket.id = "${socket.id}"`);   
    console.log(`Connected, socket = "${{socket}}"`);           
//==================================================================================================
    const message = "Это сообщение пробую передать по сокетам конкретно одному клиенту";
    this.server.emit(message);
    socket.emit(socket.id, message);
    //usersClients[userId].forEach((client) => client.emit(message))
//==================================================================================================
});                                                      
  }                                                      

  //@UseGuards(JwtAuthGuard)
  @SubscribeMessage('authMessage')
  async auth(@MessageBody() createMessageDto: CreateUserDto,
             @ConnectedSocket() socket: Socket) 
  {
    console.log(`Авторизация, client = "${socket}"`);                                  // YMP
    console.log(`Авторизация, client.id = "${socket.id}"`);                            // YMP
    const tokenClientSocket = await this.messagesService.auth(socket.id, createMessageDto);
    this.server.emit('newsNotification', tokenClientSocket);
//==================================================================================================
// usersClients[userId].forEach((client) => client.emit(message))

// socket.clients.forEach(client => {
//       if (!masSubscripter.includes('') && !masSocketToken.includes('')) {
//           client.send(JSON.stringify(message))
//       }
//   })
//==================================================================================================
    return tokenClientSocket;
  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);
    this.server.emit('message', message);
    console.log(message);
    return message;
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody('id') id: number): number {
    //id === messageBody.id
    console.log(`id = "${id}"`);                            // YMP
    return id;
  }



  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string, 
    //@MessageBody('email') email: string, 
    @ConnectedSocket() client: Socket,
    ){ return this.messagesService.identify(name, client.id); }

    
  // @SubscribeMessage('findOneMessage')
  // findOne(@MessageBody() id: number) {
  //   return this.messagesService.findOne(id);
  // }

  // @SubscribeMessage('updateMessage')
  // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  // }

  // @SubscribeMessage('removeMessage')
  // remove(@MessageBody() id: number) {
  //   return this.messagesService.remove(id);
  // }
}
