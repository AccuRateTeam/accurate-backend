import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { PrismaService } from '../common/services/prisma.service';
import { ParcourService } from '../parcour/parcour.service';
import { UserService } from '../user/user.service';
import { EventsGateway } from './events.gateway';

@Module({
  controllers: [EventController],
  providers: [
    PrismaService,
    EventService,
    ParcourService,
    UserService,
    EventsGateway,
  ],
})
export class EventModule {}
