import {
  IsString,
  IsMongoId,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

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
  coverImage: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true, message: 'Mỗi tag phải là một MongoId hợp lệ' })
  tags?: string[];

  @IsOptional()
  @IsNumber()
  like?: number;

  @IsString()
  slug: string;
}
