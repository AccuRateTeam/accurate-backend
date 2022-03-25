import { MaxLength } from 'class-validator';

export class JoinEventDto {
  @MaxLength(32)
  event_id: string;
}
