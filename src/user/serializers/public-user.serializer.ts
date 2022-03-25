import { Exclude } from 'class-transformer';
import { PrivateUser } from './private-user.serializer';

export class PublicUser extends PrivateUser {
  @Exclude()
  user_email: string;
}
