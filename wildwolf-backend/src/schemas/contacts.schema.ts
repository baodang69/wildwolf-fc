import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: 'users', required: true })
  opponent: Types.ObjectId;

  @Prop({ required: true })
  appointmenttime: Date;

  @Prop({ required: true })
  stadium: string;

  @Prop({ default: 'Chưa có ghi chú' })
  note: string;

  @Prop({
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Prop({ default: '' })
  opponent_club: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
