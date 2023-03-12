import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: { 
          url: 'redis://localhost:6379',
        },
      }),
    }),
    ],
  controllers: [RedisController],
  providers: [RedisService]
})
export class RedisModule_ {}
