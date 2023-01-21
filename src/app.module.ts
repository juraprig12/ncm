import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

//import { UserEntity } from './user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), /*AppModule*/ UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
