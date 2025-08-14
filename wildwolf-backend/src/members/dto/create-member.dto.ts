import {
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import {
  MemberStatus,
  MemberPosition,
  MemberRole,
} from '../../schemas/members.schema';

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
  @IsEnum(MemberRole, {
    message: `role phải là một trong các giá trị: ${Object.values(MemberRole).join(', ')}`,
  })
  role?: MemberRole;

  @IsOptional()
  @IsEnum(MemberPosition, {
    message: `position phải là một trong các giá trị: ${Object.values(MemberPosition).join(', ')}`,
  })
  position?: MemberPosition;

  @IsOptional()
  @IsEnum(MemberStatus, {
    message: `status phải là một trong các giá trị: ${Object.values(MemberStatus).join(', ')}`,
  })
  status?: MemberStatus;
}
