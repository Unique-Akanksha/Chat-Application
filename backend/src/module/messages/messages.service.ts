import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel('Message')
        private readonly messageModel: Model<Message>,
    ) { }
}
