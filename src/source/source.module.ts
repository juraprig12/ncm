import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceEntity } from './entities/source.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SourceEntity])],
  controllers: [SourceController],
  providers: [SourceService]
})
export class SourceModule {}
