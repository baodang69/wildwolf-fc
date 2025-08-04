import { IsString, IsMongoId, IsOptional, IsNumber } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  summary: string;

  @IsMongoId()
  author: string;

  @IsString()
  coverimage: string;

  @IsOptional()
  @IsNumber()
  like?: number;
}
