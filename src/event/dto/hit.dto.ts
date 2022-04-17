import {IsNumber, IsString, Max, Min} from 'class-validator';

export class HitDto {
  @IsString({message: 'Es wurde kein Target angegeben.'})
    target_id: string;

  @IsNumber(undefined, {message: 'Es wurde kein Treffer angegeben.'})
  @Min(1, {message: 'Der Treffer kann nicht kleiner als 1 sein.'})
  @Max(3, {message: 'Der Treffer kann nicht größer als 3 sein.'})
    arrow: number;

  @IsNumber(undefined, {message: 'Es wurde kein Score angegeben.'})
  @Min(0, {message: 'Der Score kann nicht kleiner als 0 sein.'})
  @Max(3, {message: 'Der Score kann nicht größer als 3 sein.'})
    score: number;
}