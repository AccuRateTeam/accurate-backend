import {MaxLength, Min, MinLength} from "class-validator";

export class CreateParcourDto {
  @MinLength(3)
  @MaxLength(45)
  parcour_name: string;
}