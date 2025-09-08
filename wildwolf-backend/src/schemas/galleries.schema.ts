import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GalleryDocument = Gallery & Document;

export enum ImageStatus {
  SHOW = 'SHOW',
  HIDE = 'HIDE',
}

@Schema({ timestamps: true })
export class Gallery {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  imageUrl: string; // Đổi tên từ 'image' sang 'imageUrl' cho rõ ràng

  @Prop({ required: true })
  _id: string; 

  @Prop()
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'Chưa có ghi chú' })
  note: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  userLiked: Types.ObjectId[];

  @Prop({
    enum: ImageStatus,
    default: ImageStatus.SHOW,
  })
  status: ImageStatus;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
