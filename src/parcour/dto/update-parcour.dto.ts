import {ArrayNotEmpty, IsArray, IsString, MaxLength, MinLength} from 'class-validator';
import {CreateTargetDto} from '../../target/dto/create-target.dto';

export class UpdateParcourDto {
  @IsString({message: 'Es wurde kein Parkour Name angegeben.'})
  @MinLength(3, {message: 'Der Parkour Name muss mindestens 3 Zeichen lang sein.',})
  @MaxLength(45, {message: 'Der Parkour Name darf maximal 45 Zeichen lang sein.'})
    parcour_name: string;

  @IsArray({message: 'Es wurden keine Ziele angegeben.'})
  @ArrayNotEmpty({message: 'Es wurden keine Ziele angegeben.'})
    targets: CreateTargetDto[];
}
