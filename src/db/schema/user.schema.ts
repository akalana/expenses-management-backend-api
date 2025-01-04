import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * @fileoverview This schema file define what are the arributes in the User document
 * Ref :- https://docs.nestjs.com/techniques/mongodb#mongo
 */
@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ required: true })
    sub: string;

    @Prop({ default: 0 })
    maxExpensesLimit: number;
}
//
export const UserSchema = SchemaFactory.createForClass(User);
