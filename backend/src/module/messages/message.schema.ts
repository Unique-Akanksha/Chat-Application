import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument =
    HydratedDocument<Message>;

@Schema({
    timestamps: true,
})
export class Message {
    @Prop({
        required: true,
    })
    conversationId!: string;

    @Prop({
        required: true,
    })
    senderId!: string;

    @Prop({
        required: true,
        trim: true,
    })
    content!: string;

    @Prop({
        default: false,
    })
    isRead!: boolean;
}

export const MessageSchema =
    SchemaFactory.createForClass(Message);