import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [MessagesController, MessagesService, AuthService],
  controllers: [/*MessagesGateway*/],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {expiresIn: '1h'}
    })
    ],
  exports: [
    AuthService,
    JwtModule
    ] 
})
export class MessagesModule {}
