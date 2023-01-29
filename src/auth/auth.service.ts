import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { encryptPassword } from '../app.module';
const crypto = require('crypto')


@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            return `Пользователь с таким email: "${userDto.email}" уже существует`;
        }
        const hashPassport = encryptPassword(userDto.password)
        const user = await this.userService.create({...userDto, password: hashPassport})
        return this.generateToken(user)
    }

    private async generateToken(user: UserEntity) {
    const payload = {email: user.email, id: user.id /*, roles: user.roles*/}
    return {
        token: this.jwtService.sign(payload)
    }
    }

    private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    //userDto.password = encryptPassword(userDto.password);  // YMP
    //const passwordEquals = (user.password === userDto.password);

    if (user && (user.password === encryptPassword(userDto.password))) {
        return user;
    }
    throw new UnauthorizedException({message: 'Некорректный email или пароль'})
}

}
