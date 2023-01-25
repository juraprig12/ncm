import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SourceService } from './source.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';

@Controller('source')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Post()
  create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourceService.create(createSourceDto);
  }

  @Get()
  findAll() {
    return this.sourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateSourceDto: UpdateSourceDto) {
    return this.sourceService.update(+id, UpdateSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sourceService.remove(+id);
  }

  @Delete('/delete/ip/:email')
  remove_ip(@Param('link') link: string) {
    return this.sourceService.remove_ip(link);
  }  
}
