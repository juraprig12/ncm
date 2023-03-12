import { Controller, Get, Param, Redirect, Body} from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
//import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              /*@InjectRedis() private readonly redis: Redis,*/) {}

  // @Get('/redis/test')
  // async getRedis(@Body() data: any) {
  //   console.log(typeof data)
  //   let redisKey = JSON.stringify(data) /*.password*/;
  //   let redisData = redisKey;
  //   let redisResult = await this.redis.get(redisKey);
  //   if (redisResult) {
  //     redisResult = JSON.parse(redisResult);
  //     return redisResult;                            //return `В базе redis такие данные уже есть: ${redisData}`;
  //   } else {
  //     await this.redis.set(redisKey, redisData);     //redisData = await this.redis.get(redisKey);
  //     return `Эти новые данные введены в базу redis: ${redisData}`;
  //   }

    // {
    //   "password1": "секретный и лысый", 
    //   "email": "непейлысый@gmail.com"
    // }
    // {"password1":"5секретный и лысый","email":"5непейлысый@gmail.com"}  

  //await this.redis.set('key', 'Redis data!');
  //await this.redis.set('key', redisData);
  //redisData = await this.redis.get("key");
  //}

  @Get() 
  //@HttpCode(204) 
  getHello(): string {  
    return this.appService.getHello();  // по основному пути запускается этот метод из модуля appService
  }

   @Get('/user/verni_id/:id') 
  getUser(@Param('id') id: string): string {  
    return this.appService.getUser(+id);  
  }

  @Get('image')  
  @Redirect('https://www.pinterest.com/1970bubnova/%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%8B%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8/')
  test(){ /*return { result: 'Ok' };*/ }     
  
  }

