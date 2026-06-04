import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }])],
  controllers: [ConversationsController],
  providers: [ConversationsService]
})
export class ConversationsModule { }
