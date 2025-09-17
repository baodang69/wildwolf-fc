import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FormationDocument = Formation & Document;

@Schema({ _id: false })
export class NodeSize {
  @Prop({ required: true })
  top: number;

  @Prop({ required: true })
  left: number;
}

export class Detail {
  @Prop({ type: NodeSize, required: true })
  size: NodeSize;

  @Prop({ required: true })
  position: string;

  @Prop({ type: Types.ObjectId, ref: 'Member', required: false })
  memberId: Types.ObjectId;
}

@Schema({ timestamps: true })
export class Formation {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  detail: Detail[];
}

export const FormationSchema = SchemaFactory.createForClass(Formation);
