import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service';
//import { CreateRediDto } from './dto/create-redi.dto';
//import { UpdateRediDto } from './dto/update-redi.dto';

@Controller('redis')
export class RedisController {
  constructor(/*private readonly redisService: RedisService,*/
              @InjectRedis() private readonly redis: Redis,) {}

  @Get('/get')
  async getRedis(@Body() inputRedisKey: any) {
    let redisKey = JSON.stringify(inputRedisKey);
    let redisResult = await this.redis.get(redisKey);
    if (redisResult) {
      return `В базе redis такие данные уже есть: ${redisResult}`;
    } //else { return `В базе redis нет таких данных`; }
  }

  @Post('/set')
  async setRedis(@Body() inputRedisKey: any, inputRedisData: any) {
    let redisKey = JSON.stringify(inputRedisKey);
    let redisData = JSON.stringify(inputRedisData);
    let redisResult = await this.redis.get(redisKey);
    if (redisResult) { 
      return `В базе redis такие данные уже есть: ${redisResult}`; 
    } 
      else 
      { 
        await this.redis.set(redisKey, redisData);
        return `Эти новые данные введены в базу postgreSQL и redis: ${redisData}` 
      } 
  }


  // @Post()
  // create(@Body() createRediDto: CreateRediDto) {
  //   return this.redisService.create(createRediDto);
  // }

  // @Get()
  // findAll() {
  //   return this.redisService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.redisService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRediDto: UpdateRediDto) {
  //   return this.redisService.update(+id, updateRediDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.redisService.remove(+id);
  // }
}
