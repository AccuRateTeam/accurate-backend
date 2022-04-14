import {IsString, MaxLength, MinLength} from 'class-validator';

export class UpdateTargetDto {
  @IsString({message: 'Es wurde kein Name angegeben.'})
  @MinLength(3, {message: 'Der Name muss mindestens 3 Zeichen lang sein.'})
  @MaxLength(32, {message: 'Der Name darf maximal 32 Zeichen lang sein.'})
    target_name: string;
}
