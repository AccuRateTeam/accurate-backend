import { MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(3)
  @MaxLength(16)
    user_name: string;
}
