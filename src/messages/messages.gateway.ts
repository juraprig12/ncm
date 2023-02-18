import { ConnectedSocket ,WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {Server, Socket} from 'socket.io';
import { OnModuleInit } from '@nestjs/common';            // YMP

@WebSocketGateway(
//   /*3001,*/{ 
//   cors: { 
//     origin: ['http://localhost:3000'],        // YMP
//     //origin: '*', 
//   }
// }
{ transports: ['websocket'] })   // YMP


export class MessagesGateway /*implements OnModuleInit*/ {       //  YMP
  @WebSocketServer()
  server: Server;

  // onModuleInit() {                                         // YMP
  //   this.server.on('connection', (socket) => {              // YMP
  //     console.log(socket.id);                             // YMP
  //     console.log('Connected');                            // YMP
  //   });                                                   // YMP
  // }                                                         // YMP

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('events')
  handleEvent(@MessageBody('id') id: number): number {
    // id === messageBody.id
    return id;
  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);
    this.server.emit('message', message);
    return message;
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
    ){ return this.messagesService.identify(name,/* email,*/ client.id); }






    
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
