import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

global.masSocketClients = [];
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
