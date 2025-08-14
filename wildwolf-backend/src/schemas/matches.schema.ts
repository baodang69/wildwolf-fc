import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MatchDocument = Match & Document;

@Schema({ _id: false })
export class OurScorer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1 })
  number_of_goal: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Member' })
  id: Types.ObjectId;
}

export const OurScorerSchema = SchemaFactory.createForClass(OurScorer);

@Schema({ _id: false })
export class OpponentScorer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1 })
  number_of_goal: number;
}

export const OpponentScorerSchema =
  SchemaFactory.createForClass(OpponentScorer);

export enum Status {
  FINISH = 'FINISH',
  COMING_SOON = 'COMING_SOON',
  HIDE = 'HIDDEN',
}

@Schema({
  timestamps: true,
})
export class Match {
  @Prop({ required: true })
  opponent: string;

  @Prop({ type: [OurScorerSchema], default: [] })
  our_scorer: OurScorer[];

  @Prop({ required: true })
  stadium: string;

  @Prop({ default: '' })
  opponent_avatar: string;

  @Prop({ type: [OpponentScorerSchema], default: [] })
  opponent_scorer: OpponentScorer[];

  @Prop({ required: true, default: 'Trận đấu sắp diễn ra !' })
  summary: string;

  @Prop({ default: 0 })
  our_goal: number;

  @Prop({ default: 0 })
  opponent_goal: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ required: true })
  date: Date;

  @Prop({
    enum: Status,
    default: Status.COMING_SOON,
  })
  status: Status;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
