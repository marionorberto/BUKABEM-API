import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateTagDto } from 'src/models/tags/dtos/create-tag.dto';

export class CreateProfileDto {
  @MaxLength(3)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  countryName: string;

  @IsDateString()
  birthday: string;

  @IsNumber()
  @IsNotEmpty()
  yearsWorking: number;

  @MaxLength(300)
  @MinLength(3)
  @IsString()
  bio: string;

  @MaxLength(100)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  job: string;

  @IsBoolean()
  remoteJob: boolean;

  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  urlImg: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  website: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  tags: CreateTagDto[];
}
