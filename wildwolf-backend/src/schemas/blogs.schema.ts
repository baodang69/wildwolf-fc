import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({
  timestamps: true, // Tự động thêm createdAt và updatedAt
})
export class Blog {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'users', required: true })
  author: Types.ObjectId;

  @Prop({ required: true })
  coverimage: string;

  @Prop({ default: 0 })
  like: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
