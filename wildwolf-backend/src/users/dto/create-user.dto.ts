import { IsString, IsEmail, IsNumberString } from 'class-validator';

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
  role: string;
}
