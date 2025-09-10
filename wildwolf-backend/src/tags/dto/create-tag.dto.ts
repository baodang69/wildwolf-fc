import { IsString, IsNotEmpty, IsLowercase, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug chỉ được chứa các ký tự thường, số và dấu gạch ngang',
  })
  @Transform(({ value }) => value.trim().replace(/\s+/g, '-'))
  slug: string;
}
