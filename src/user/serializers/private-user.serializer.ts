import { BaseSerializer } from '../../common/serializers/base.serializer';
import { user } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class PrivateUser extends BaseSerializer<user> {
  @Exclude()
  user_auth_id: string;
}
