import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({
  timestamps: true,
})
export class Blog {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ required: true })
  coverImage: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }], default: [] })
  tags: Types.ObjectId[];

  @Prop({ default: 0 })
  like: number;

  @Prop({ default: '' })
  slug: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
