import { Injectable } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { SourceEntity } from './entities/source.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SourceService {
  
  constructor(
    @InjectRepository(SourceEntity)
    private repository: Repository<SourceEntity>, // вот здесь определяется, что сущность CrudUserEntity будет ОСНОВНОЙ
    ) {}

  create(createSourceDto: CreateSourceDto) {
    return this.repository.save(createSourceDto);
    return 'This action adds a new source';
  }

  findAll() {
    return this.repository.find();
    return `This action returns all source`;
  }

  findOne(id: number) {
    return this.repository.findOneBy({id});
    return `This action returns a #${id} source`;
  }

  update(id: number, updateSourceDto: UpdateSourceDto) {
    return this.repository.update(id, updateSourceDto);
    return `This action updates a #${id} source`;
  }

  remove(id: number) {
    return this.repository.delete({id});
    return `This action removes a #${id} source`;
  }
  
  remove_ip(link: string) {
    return this.repository.delete({link});
    //return `This action removes a #${id} crudUser`;
  }  

}
