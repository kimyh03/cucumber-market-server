import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { User } from './user/user.entity';
import { Post } from './post/post.entity';
import { Review } from './review/review.entity';
import { Deal } from './deal/deal.entity';
import { Chat } from './chat/chat.entity';
import { Message } from './message/message.entity';
import { Like } from './like/like.entity';

@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql', sortSchema: true }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'cucumbermarket',
      entities: [User, Post, Review, Deal, Chat, Message, Like],
      synchronize: true,
      logging: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
