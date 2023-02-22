import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
//import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MessagesService {
  constructor(
    private authService: AuthService,
  ) {}

  messages: Message[] = [{name: 'Yura', text: 'Yes'}];
  clientToUser = {};
  //masSocketClients = [];

  async auth(createMessageDto: CreateUserDto) {
    const ansverClientSocket = (await this.authService.login(createMessageDto));
    const tokenClientSocket = (await ansverClientSocket.token).token;
    const passwordClientSocket = ansverClientSocket.password;
      if (!global.masSocketClients.includes(passwordClientSocket)) 
        {
          global.masSocketClients.push(passwordClientSocket);
        }    
    console.log(ansverClientSocket);
    return tokenClientSocket;
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }


  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }


  create(createMessageDto: CreateMessageDto) {
    const message = {...createMessageDto};
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
