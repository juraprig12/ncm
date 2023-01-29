import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SourceModule } from './source/source.module';
import { AuthModule } from './auth/auth.module';
const crypto = require('crypto')

export const encryptPassword = (stroka: string) => {
  stroka = crypto.createHash('sha256', process.env.SECRET_KEY).update(stroka).digest('hex');
  return stroka;
}

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    SourceModule,
    AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
}

) 
export class AppModule {}
