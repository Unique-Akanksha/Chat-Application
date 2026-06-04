import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
})
export class User {
    @Prop({
        required: true,
        trim: true,
    })
    firstName!: string;

    @Prop({
        required: true,
        trim: true,
    })
    lastName!: string;

    @Prop({
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    })
    email!: string;

    @Prop({
        required: true,
    })
    passwordHash!: string;

    @Prop()
    avatar?: string;

    @Prop({
        required: true,
    })
    designation!: string;

    @Prop({
        required: true,
    })
    department!: string;

    @Prop({
        enum: ['active', 'inactive', 'blocked'],
        default: 'active',
    })
    status!: string;

    @Prop()
    lastSeen?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);