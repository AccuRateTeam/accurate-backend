import { MaxLength, MinLength } from "class-validator";

export class UpdateParcourDto {
  @MinLength(3)
  @MaxLength(45)
  parcour_name: string;
}