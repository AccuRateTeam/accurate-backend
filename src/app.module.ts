import { Module } from '@nestjs/common';
import { AuthzModule } from './authz/authz.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { ParcourModule } from './parcour/parcour.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from './logger/logger.module';
import { TargetModule } from './target/target.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    AuthzModule,
    UserModule,
    EventModule,
    ParcourModule,
    LoggerModule,
    TargetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
