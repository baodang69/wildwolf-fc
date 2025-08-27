import {
  IsString,
  IsEmail,
  IsNumberString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../../schemas/user.schema';

export class CreateUserDto {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  club?: string;

  @IsOptional()
  @IsNumberString()
  phone?: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
