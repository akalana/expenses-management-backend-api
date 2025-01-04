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

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    sub: string;
}
//
export const UserSchema = SchemaFactory.createForClass(User);
