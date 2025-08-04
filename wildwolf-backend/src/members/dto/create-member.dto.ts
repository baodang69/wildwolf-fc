import { IsString, IsNumber, IsEnum, IsDateString, IsOptional, Min, Max } from 'class-validator';
import { MemberStatus, MemberPosition, MemberRole } from '../../schemas/members.schema';

export class CreateMemberDto {
  @IsString()
  fullname: string;

  @IsString()
  avatar: string;

  @IsDateString()
  dob: string;

  @IsNumber()
  @Min(1)
  @Max(99)
  number: number;

  @IsString()
  summary: string;

  @IsOptional()
  @IsEnum(MemberRole)
  role?: MemberRole;

  @IsOptional()
  @IsEnum(MemberPosition)
  position?: MemberPosition;

  @IsOptional()
  @IsEnum(MemberStatus)
  status?: MemberStatus;
}
