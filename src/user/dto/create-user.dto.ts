import { MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(16)
  user_name: string;
}