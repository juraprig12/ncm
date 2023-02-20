import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';


@Module({
  providers: [MessagesController, MessagesService],
  controllers: [/*MessagesGateway*/]
})
export class MessagesModule {}
