import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ImageStatus } from '../../schemas/galleries.schema';

export class UserDto {
  _id: string;
  fullname: string;
  avatar?: string;
}

export class UserLikedDto {
  _id: string;
  fullname: string;
}

export class CreateGalleryDto {
  @IsNotEmpty()
  user: UserDto;

  @IsOptional()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsArray()
  userLiked?: UserLikedDto[];

  @IsOptional()
  @IsEnum(ImageStatus)
  status?: ImageStatus;
}
