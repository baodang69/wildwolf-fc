import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  club: string;

  @Prop({ required: true })
  phone: string;

  @Prop({
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
