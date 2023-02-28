const ws = require('ws');

import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserEntity } from "../user/entities/user.entity";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { encryptPassword } from '../app.module';
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
require('dotenv').config();

const SOCKET_PORT = process.env.SOCKET_PORT || 8080;

//////////////////////////////////////////////////////////////////////////////////////////////////////////
const SocketServer = new ws.Server({ port: SOCKET_PORT, }, () => {
    console.log(`Socket Server started on port = ${SOCKET_PORT}`)
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////
SocketServer.on('connection', (client) => {
    client.id = Date.now();          // YMP - это надо наполнять при логинах, и сюда вставлять
    let message = `Пользователь c id ${client.id} подключился`;
    broadcastMessage(message);

    client.on('message', (message) => {
        message = JSON.parse(message);
        const clientSocketId = client.id
        const payloadToken = parseJwt(message.accesstoken);
        const newsOn = payloadToken.news_on
        console.log(clientSocketId) // John
        console.log(newsOn) // John
        global.mapSocketClients.set(clientSocketId, newsOn);
        broadcastMessage(`Клиент по сокету c id = ${client.id} подключился`);
    }) 
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function broadcastMessage(message) {
    SocketServer.clients.forEach(client => {
        if (global.mapSocketClients.get(client.id) && global.mapSocketClients.get(client.id) === '1') {
            client.send(message)
        }
    })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class SocketService { 
    
    constructor(private userService: UserService, 
                private jwtService: JwtService,
    ) {}

async login(userDto: CreateUserDto /*, SocketServer, broadcastMessage*/) {
let user = await this.validateUser(userDto);
return this.generateToken(user)     //userToken
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
const payload = {email: user.email, username: user.username /*, roles: user.roles*/}
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

}  // конец класса

//client.send(JSON.parse(message)/*.stringify()*/)
//client.send(JSON.stringify(message)/*.stringify()*/)

// export async function broadcastMessage(message /*, masSubscripter, masSocketToken*/) {
//     SocketServer.clients.forEach(client => {
//         if (!masSubscripter.includes('') && !masSocketToken.includes('')) {
//             client.send(JSON.parse(message)/*.stringify()*/)
//         }
//     })
// }