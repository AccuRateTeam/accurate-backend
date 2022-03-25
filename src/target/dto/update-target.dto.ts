import {IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength} from "class-validator";

export class UpdateTargetDto {
  @IsString({message: 'Es wurde kein Name angegeben.'})
  @MinLength(3, {message: 'Der Name muss mindestens 3 Zeichen lang sein.'})
  @MaxLength(32, {message: 'Der Name darf maximal 32 Zeichen lang sein.'})
  target_name: string;

  @IsInt({message: 'Es wurde keine Entfernung angegeben.'})
  @Min(0, {message: 'Die Entfernung darf nicht kleiner als 1m sein.'})
  @Max(1000, {message: 'Die Entfernung darf nicht größer als 1000m sein.'})
  target_distance1: number;

  @IsOptional()
  @Min(0, {message: 'Die Entfernung darf nicht kleiner als 1m sein.'})
  @Max(1000, {message: 'Die Entfernung darf nicht größer als 1000m sein.'})
  target_distance2: number;

  @IsOptional()
  @Min(0, {message: 'Die Entfernung darf nicht kleiner als 1m sein.'})
  @Max(1000, {message: 'Die Entfernung darf nicht größer als 1000m sein.'})
  target_distance3: number;
}