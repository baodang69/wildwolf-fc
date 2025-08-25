import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemberDocument = Member & Document;

export enum MemberStatus {
  PLAYING = 'PLAYING',
  INJURED = 'INJURED',
  HIDDEN = 'HIDDEN',
}

export enum MemberPosition {
  GK = 'GK',
  DF = 'DF',
  MF = 'MF',
  FW = 'FW',
  FLEX = 'FLEX',
}

export enum MemberRole {
  CAPTAIN = 'CAPTAIN',
  VICE_CAPTAIN = 'VICE_CAPTAIN',
  PLAYER = 'PLAYER',
}

@Schema({
  timestamps: true,
})
export class Member {
  @Prop({ required: true })
  fullname: string;

  @Prop({})
  avatar: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true, default: 'Cầu thủ mới' })
  summary: string;

  @Prop({
    enum: MemberRole,
    default: MemberRole.PLAYER,
  })
  role: MemberRole;

  @Prop({
    enum: MemberPosition,
    default: MemberPosition.FLEX,
  })
  position: MemberPosition;

  @Prop({
    enum: MemberStatus,
    default: MemberStatus.PLAYING,
  })
  status: MemberStatus;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
