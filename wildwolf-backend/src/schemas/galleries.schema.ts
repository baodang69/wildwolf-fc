import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type GalleryDocument = HydratedDocument<Gallery>;

export enum ImageStatus {
  SHOW = 'SHOW',
  HIDE = 'HIDE',
}

@Schema({ timestamps: true })
export class Gallery {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ default: '' })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'Chưa có ghi chú' })
  note: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [], required: false })
  userLiked: Types.ObjectId[];

  @Prop({ type: String, enum: ImageStatus, default: ImageStatus.SHOW })
  status: ImageStatus;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
