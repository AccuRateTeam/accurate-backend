import { MaxLength, MinLength } from 'class-validator';

export class UpdateEventDto {
  @MinLength(3)
  @MaxLength(45)
  event_name: string;
}
