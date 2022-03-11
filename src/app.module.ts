import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { AuthzModule } from './authz/authz.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [ItemsModule, AuthzModule, UserModule, EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
