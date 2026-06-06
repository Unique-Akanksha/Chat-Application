import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './schemas/conversation.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConversationsService {
    constructor(
        @InjectModel('Conversation')
        private readonly conversationModel: Model<Conversation>,
    ) { }
}
