import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

@Schema({
  timestamps: true,
})
export class User {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: false })
  club: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
