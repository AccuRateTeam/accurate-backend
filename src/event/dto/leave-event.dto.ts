import { MaxLength } from 'class-validator';

export class LeaveEventDto {
  @MaxLength(32)
  event_id: string;
}
