import {
  IsMongoId,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateEventRegistrationDto {
  @IsMongoId()
  @IsNotEmpty()
  event: string;
}

export class UpdateEventRegistrationDto {
  @IsBoolean()
  @IsOptional()
  checkinDone?: boolean;

  @IsDateString()
  @IsOptional()
  checkinTime?: string;
}
