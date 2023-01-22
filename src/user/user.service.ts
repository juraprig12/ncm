import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { PrimaryGeneratedColumnIdentityOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnIdentityOptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>, // вот здесь определяется, что сущность CrudUserEntity будет ОСНОВНОЙ
    ) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
    //return 'This action adds a new user';
  }

  findAll() {
    return this.repository.find();
    //return `This action returns all user`;
  }

  findOne(id: number) {
    return this.repository.findOneBy({id});
    //return `This action returns a #${id} User`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
    //return `This action updates a #${id} crudUser`;
  }

  remove(id: number) {
    return this.repository.delete({id});
    //return `This action removes a #${id} user`;
  }

  remove_ip(ip: string) {
    return this.repository.delete({ip});
    //return `This action removes a #${id} crudUser`;
  }  
}
