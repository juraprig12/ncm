import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    //console.log(global.masSocketClients);
    return 'Без строки запроса, без тела запроса!';
  }

  getUser(id: number): string {
    return `Сработало из app.controller. User ID: ${id}`;
  }
    
}
