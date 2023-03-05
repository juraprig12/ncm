import { NestFactory } from '@nestjs/core';
//import { use } from 'passport';
import { AppModule } from './app.module';
require('dotenv').config();

global.mapSocketClients = new Map();

async function httpServer() {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`httpServer started on port = ${PORT}`));
}
httpServer();


// npm i --save --legacy-peer-deps @nestjs/websockets@9.1.6  @nestjs/platform-socket.io@9.1.6
// npm install --save --legacy-peer-deps @nestjs/passport passport passport-jwt
// npm install --save-dev --legacy-peer-deps @types/passport-jwt


// const redis = require("redis");
// import { promisify } from 'util';
// let user_ = {"Вася": "первый пошел"};
// const redisUrl = "redis://127.0.0.1:6379";
// const redisClient = redis.createClient(redisUrl);
// const getAsync = promisify(redisClient.get).bind(redisClient); 
// const setAsync = promisify(redisClient.set).bind(redisClient);
// user_ =  getAsync('user');
// if (!user_) {
//   setAsync('user', JSON.stringify(user_))
// } else {console.log(user_)}