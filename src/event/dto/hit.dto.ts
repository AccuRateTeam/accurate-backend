import {IsNumber, IsString, Max, Min} from 'class-validator';

export class HitDto {
  @IsString({message: 'Es wurde kein Target angegeben.'})
    target_id: string;

  @IsNumber(undefined, {message: 'Es wurde keine Runde angegeben.'})
  @Min(1, {message: 'Die Runde kann nicht kleiner als 1 sein.'})
  @Max(3, {message: 'Die Runde kann nicht größer als 3 sein.'})
    round: number;

  @IsNumber(undefined, {message: 'Es wurde kein Treffer angegeben.'})
  @Min(1, {message: 'Der Treffer kann nicht kleiner als 1 sein.'})
  @Max(3, {message: 'Der Treffer kann nicht größer als 3 sein.'})
    hit: number;
}