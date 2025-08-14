import { IsString, IsEmail, IsNumberString, IsEnum } from 'class-validator';
import { UserRole } from '../../schemas/user.schema';

export class CreateUserDto {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  club: string;

  @IsNumberString()
  phone: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
