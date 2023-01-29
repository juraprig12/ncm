import { Controller, Get, Param, Redirect, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

