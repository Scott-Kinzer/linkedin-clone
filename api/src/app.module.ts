import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedModule } from './feed/feed.module';
import { AuthModule } from './auth/auth.module';

import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { FriendConnectionModule } from './connections/friend-connection/friend-connection.module';
import { FriendConnectionController } from './connections/controllers/friend-connection/friend-connection.controller';
import { FriendConnectionService } from './connections/services/friend-connection/friend-connection.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    FeedModule,
    AuthModule,
    UserModule,
    FriendConnectionModule,
  ],
  providers: [AppService, FriendConnectionService],
  controllers: [AppController, FriendConnectionController],
})
export class AppModule {}
