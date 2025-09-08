import {
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  IsDateString,
  IsOptional,
  ValidateNested,
  IsMongoId,
  Min,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Status } from '../../schemas/matches.schema';

export class OurScorerDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1)
  number_of_goal: number;

  @IsMongoId()
  id: string;
}

export class OpponentScorerDto {
  @IsString()
  name: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1)
  number_of_goal: number;
}

export class CreateMatchDto {
  @IsString()
  opponent: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OurScorerDto)
  our_scorer?: OurScorerDto[];

  @IsString()
  stadium: string;

  @IsOptional()
  @IsString()
  opponent_avatar?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpponentScorerDto)
  opponent_scorer?: OpponentScorerDto[];

  @IsString()
  summary: string;

  @IsNumber()
  @Min(0)
  our_goal: number;

  @IsNumber()
  @Min(0)
  opponent_goal: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsDateString()
  date: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
