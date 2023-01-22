import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()  
  getHello(): string {  
    return this.appService.getHello();  // по основному пути запускается этот метод из модуля appService
  }

   @Get('/user/app/:id')  
  getUser(@Param('id') id: string): string {  
    return this.appService.getUser(+id);  
  }
}
