import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SourceModule } from './source/source.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
     UserModule,
     SourceModule
    ],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}
