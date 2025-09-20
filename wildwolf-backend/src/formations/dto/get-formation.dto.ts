import {
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsMongoId,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class NodeSizeDto {
  @IsNumber()
  top: number;

  @IsNumber()
  left: number;
}

export class DetailDto {
  @ValidateNested()
  @Type(() => NodeSizeDto)
  size: NodeSizeDto;

  @IsString()
  position: string;

  @IsOptional()
  @IsMongoId()
  memberId?: string | null;
}

export class FormationDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailDto)
  detail: DetailDto[];

  @IsString()
  @IsNotEmpty()
  status: boolean;
}
