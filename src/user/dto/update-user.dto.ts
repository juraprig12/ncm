import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    username: string;
    password?: string;
    ip: string;
    phone?: string;
    email?: string;
}

//export class UpdateUserDto extends PartialType(CreateUserDto) {}

