import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SourceModule } from './source/source.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { SocketModule } from './socket/socket.module';
//import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisModule_ } from './redis/redis.module';
import { RedisController } from './redis/redis.controller';
const crypto = require('crypto')
//import { MessagesGateway } from './messages/messages.gateway';


export const encryptPassword = (stroka: string) => {
  stroka = crypto.createHash('sha256', process.env.SECRET_KEY).update(stroka).digest('hex');
  return stroka;
}

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    // RedisModule.forRootAsync({
    //   useFactory: () => ({
    //     config: { 
    //       url: 'redis://localhost:6379',
    //     },
    //   }),
    // }),
    UserModule,
    SourceModule,
    AuthModule,
    MessagesModule,
    SocketModule,
    RedisModule_,
    ],
  controllers: [AppController,RedisController],
  providers: [AppService],
}

) 
export class AppModule {}
