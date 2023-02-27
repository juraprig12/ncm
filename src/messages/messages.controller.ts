import { ConnectedSocket ,WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {Server, Socket} from 'socket.io';
import { Controller, OnModuleInit } from '@nestjs/common';            // YMP
import { CreateUserDto } from 'src/user/dto/create-user.dto';
//import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway(
  /*3001,*/{ 
  cors: { 
    origin: ['http://localhost:3000'],        // YMP
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

  onModuleInit() {                                          // YMP
    this.server.on('connection', (socket) => {              // YMP
    //socket.data = {password: "секретный и лысый", email: "непейлысый@gmail.com"};      // YMP
    console.log(`Connected, socket.id = "${socket.id}"`);   // YMP
    console.log(`Connected, socket = "${{socket}}"`);       // YMP
  });                                                       // YMP
  }                                                         // YMP

  @SubscribeMessage('authMessage')
  async auth(@MessageBody() createMessageDto: CreateUserDto,
             @ConnectedSocket() socket: Socket) 
  {
    console.log(`Автоизация, client = "${socket}"`);                            // YMP
    console.log(`Автоизация, client.id = "${socket.id}"`);                            // YMP
    const tokenClientSocket = await this.messagesService.auth(socket.id, createMessageDto);
    this.server.emit('tokenMessage', tokenClientSocket);
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
