import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true, // Tự động thêm createdAt và updatedAt
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

  @Prop({ default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
