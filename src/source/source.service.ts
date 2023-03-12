import { Injectable } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { SourceEntity } from './entities/source.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Index, Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { broadcastMessage } from 'src/socket/socket.service';
import { RedisController } from 'src/redis/redis.controller';
import { IS_NUMBER } from 'class-validator';

@Injectable()
export class SourceService {
  
  constructor(
    @InjectRepository(SourceEntity)
    private repositorySource: Repository<SourceEntity>,
    private redisController: RedisController,
    //@InjectRepository(UserEntity)
    //private repositoryUser: Repository<UserEntity>,
    //private server: MessagesController
    ) {}

    //@WebSocketServer() server: Server;
  
  async create(createSourceDto: CreateSourceDto) {

    let keyRedis = Object.assign({}, createSourceDto);              // КЛОНИРОВАНИЕ ОБЪЕКТА
    let redisData = await this.redisController.getRedis(keyRedis);  // YMP
    if (redisData) {
      return redisData  
    }

    await this.repositorySource.save(createSourceDto);

    redisData = await this.redisController.setRedis(keyRedis, createSourceDto);  // YMP
    // if (redisData) {
    //   console.log(redisData);                                                    // YMP
    //   return redisData  
    // }

    const message = `появилась новая статься: "${createSourceDto.comment}"`;
    broadcastMessage(message);
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
