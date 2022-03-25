import {IsString, MaxLength, Min, MinLength} from "class-validator";

export class CreateParcourDto {
  @IsString({message: 'Es wurde kein Parkour Name angegeben.'})
  @MinLength(3, {message: 'Der Parkour Name muss mindestens 3 Zeichen lang sein.'})
  @MaxLength(45, {message: 'Der Parkour Name darf maximal 45 Zeichen lang sein.'})
  parcour_name: string;
}