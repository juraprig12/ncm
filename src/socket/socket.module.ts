import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [SocketController],
  providers: [SocketService],
  imports: [
    //UserService,
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {expiresIn: '900000'}
    })
  ]
})
export class SocketModule {}
