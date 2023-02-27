import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceEntity } from './entities/source.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { MessagesController } from 'src/messages/messages.controller';  // YMP

@Module({
  imports: [TypeOrmModule.forFeature([SourceEntity]), TypeOrmModule.forFeature([UserEntity]), ],
  controllers: [SourceController, /*MessagesController*/],  // YMP
  providers: [SourceService, UserService, ]
})
export class SourceModule {}
