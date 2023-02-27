import { Injectable } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { SourceEntity } from './entities/source.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Index, Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
// import { WebSocketServer } from '@nestjs/websockets';
// import {Server, Socket} from 'socket.io';
// import { MessagesController } from 'src/messages/messages.controller';
//import { elementAt } from 'rxjs';

@Injectable()
export class SourceService {
  
  constructor(
    @InjectRepository(SourceEntity)
    private repositorySource: Repository<SourceEntity>,
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
    //private server: MessagesController
    ) {}

    //@WebSocketServer() server: Server;
  
  async create(createSourceDto: CreateSourceDto) {
    
    await this.repositorySource.save(createSourceDto);
    
    let masSubscripter = [];
    let masSubscripterPassword = [];
    const news_on = '1';
    
    masSubscripter = await this.repositoryUser.findBy({news_on});
    
    masSubscripter.forEach( (element) => {
      masSubscripterPassword.push(element.password);
    })

    const message = `появилась новая статься: "${createSourceDto.comment}"`;
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    // console.table(global.masSocketClients);
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.table(masSubscripterPassword);
    global.masSocketClients.forEach( (element_socket) => {
      masSubscripterPassword.forEach( (element_subscripter) => {
        if (element_socket === element_subscripter) {
          console.log(element_socket);
          //this.server. .send(JSON.stringify(message))
          //this.server.serveClient.emit('authMessage', message);  // ?????????????????????????????
        //   export async function broadcastMessage(message /*, masSubscripter, masSocketToken*/) {
        //     SocketServer.clients.forEach(client => {
        //         if (!masSubscripter.includes('') && !masSocketToken.includes('')) {
        //             client.send(JSON.stringify(message))
        //         }
        //     })
        // }
        // ????????????????????????????????
        }
      })
    })
    return message;
  }

  findAll() {
    return this.repositorySource.find();
    return `This action returns all source`;
  }

  findOne(id: number) {
    return this.repositorySource.findOneBy({id});
    return `This action returns a #${id} source`;
  }

  update(id: number, updateSourceDto: UpdateSourceDto) {
    return this.repositorySource.update(id, updateSourceDto);
    return `This action updates a #${id} source`;
  }

  remove(id: number) {
    return this.repositorySource.delete({id});
    return `This action removes a #${id} source`;
  }
  
  remove_ip(link: string) {
    return this.repositorySource.delete({link});
    //return `This action removes a #${id} crudUser`;
  }  

}
