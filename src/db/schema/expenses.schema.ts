import { Types } from 'mongoose';
import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from './user.schema';

/**
 * @fileoverview Define the expenses related attributes in here
 */
@Schema({ timestamps: true })
export class Expense extends Document {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({})
    description: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    date: Date;
}
//
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
