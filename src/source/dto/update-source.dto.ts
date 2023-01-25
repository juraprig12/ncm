import { PartialType } from '@nestjs/mapped-types';
import { CreateSourceDto } from './create-source.dto';

export class UpdateSourceDto extends PartialType(CreateSourceDto) {
    comment?: string;
    date?: string;
    link?: string;
    usersId: number;
}
