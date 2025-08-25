import {
  IsString,
  IsMongoId,
  IsDateString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { AppointmentStatus } from '../../schemas/contacts.schema';

export class CreateAppointmentDto {
  @IsMongoId()
  opponent: string;

  @IsDateString()
  appointmenttime: string;

  @IsString()
  stadium: string;

  @IsString()
  opponent_logo: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @IsOptional()
  @IsString()
  opponent_club?: string;
}
