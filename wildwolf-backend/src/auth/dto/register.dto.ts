import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../schemas/user.schema';

export class RegisterDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsString({ message: 'Họ tên phải là chuỗi' })
  fullname: string;

  @IsString({ message: 'Câu lạc bộ phải là chuỗi' })
  club: string;

  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  phone: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: `role phải là một trong các giá trị: ${Object.values(UserRole).join(', ')}`,
  })
  role?: UserRole;
}
