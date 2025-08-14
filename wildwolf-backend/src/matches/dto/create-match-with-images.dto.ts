import {
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Status } from '../../schemas/matches.schema';

export class OurScorerFormDto {
  @IsString()
  name: string;

  @Transform(({ value }) => parseInt(value))
  number_of_goal: number;

  @IsString()
  id: string;
}

export class OpponentScorerFormDto {
  @IsString()
  name: string;

  @Transform(({ value }) => parseInt(value))
  number_of_goal: number;
}

export class CreateMatchWithImagesDto {
  @IsString()
  opponent: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value || [];
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OurScorerFormDto)
  our_scorer?: OurScorerFormDto[];

  @IsString()
  stadium: string;

  @IsOptional()
  @IsString()
  opponent_avatar?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value || [];
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpponentScorerFormDto)
  opponent_scorer?: OpponentScorerFormDto[];

  @IsString()
  summary: string;

  @Transform(({ value }) => parseInt(value) || 0)
  our_goal: number;

  @Transform(({ value }) => parseInt(value) || 0)
  opponent_goal: number;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
