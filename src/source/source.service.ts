import { Injectable } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { SourceEntity } from './entities/source.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ConnectedSocket ,WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';

@Injectable()
export class SourceService {
  
  constructor(
    @InjectRepository(SourceEntity)
    private repositorySource: Repository<SourceEntity>,
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
    //server: Server    
    ) {}

    @WebSocketServer()
    server: Server;
  
  async create(createSourceDto: CreateSourceDto) {
    //return this.repository.save(createSourceDto);
    //return 'This action adds a new source';
    await this.repositorySource.save(createSourceDto);

    let masSubscripter = [];
    const news_on = '1';

    masSubscripter = await this.repositoryUser.findBy({news_on});

    const message = {"Комментарий: ": "появилась новая статься"/*, createSourceDto*/};
    //this.server.emit('authMessage', message);  // ??????????????????????????????????????????????????????????????
    return message;

    //return broadcastMessage(message /*, masSubscripter, masSocketToken*/);
    //return 'This action adds a new source';
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
