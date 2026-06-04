import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { ConversationsModule } from './module/conversations/conversations.module';
import { MessagesModule } from './module/messages/messages.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConversationsModule,
    MessagesModule,
    MongooseModule.forRoot('mongodb://localhost/chat-application'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
