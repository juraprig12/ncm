import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRETWORDOLD',
      signOptions: {expiresIn: '900000'}
    })
    ],
  exports: [
    AuthService,
    JwtModule
    ] 
  
})
export class AuthModule {}
