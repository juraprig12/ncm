import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { encryptPassword } from '../app.module';
//const crypto = require('crypto')


@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        const tockenUser = this.generateToken(user)
        const passwordUser = user.password
        return tockenUser
        //return (await tockenUser).token
        //return {"token": tockenUser, "password": passwordUser}
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
    //const payload = {user}
    const payload = {email: user.email, id: user.id, username: user.username, news_on: user.news_on /*, roles: user.roles*/}
    return {
        accesstoken: this.jwtService.sign(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: process.env.EXPIRE_JWT
        })
    }
    }

    private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    //userDto.password = encryptPassword(userDto.password);  // YMP
    //const passwordEquals = (user.password === userDto.password);
    if (user && (user.password === encryptPassword(userDto.password))) {
        return user;
    }
    //return user;
    throw new UnauthorizedException({message: 'Некорректный email или пароль'})
}

}
