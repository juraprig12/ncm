import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const crypto = require('crypto')

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //const hash = crypto.createHash('sha256')
    //const finalHex = hash.update(createUserDto.password).digest('hex')
    //console.log(finalHex)
    createUserDto.password = crypto.createHash('sha256', 'secretkey').update(createUserDto.password).digest('hex')
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Delete('/delete/ip/:ip')
  remove_ip(@Param('ip') ip: string) {
    return this.userService.remove_ip(ip);
  }  
}
