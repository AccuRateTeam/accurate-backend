import { MaxLength, MinLength } from "class-validator";

export class CreateEventDto {
  @MinLength(3)
  @MaxLength(45)
  event_name: string;
}