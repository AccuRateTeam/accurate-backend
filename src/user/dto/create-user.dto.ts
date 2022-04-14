import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(16)
    user_name: string;

  @IsEmail()
    user_email: string;
}
