import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { event } from '@prisma/client';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { HttpGuard } from '../common/guards/http.guard';
import { HttpExceptionHandler } from '../common/exception.handlers';
import {HitDto} from './dto/hit.dto';
import {PrismaService} from '../common/services/prisma.service';
import {AuthzId} from '../common/decorators/authz-id.decorator';
import {ApiException} from '../common/exceptions/api.exception';
import {UserService} from '../user/user.service';
import {Scoreboard} from './type/scoreboard.type';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService, private userService: UserService, private prismaService: PrismaService) {}

  @UseGuards(HttpGuard)
  @Get()
  async listEvents(): Promise<event[]> {
    return await this.eventService.listEvents().catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Get(':id')
  async findEvent(@Param('id') id: string): Promise<event> {
    const event = await this.eventService
      .findEvent(id)
      .catch(HttpExceptionHandler);
    if (!event)
      throw new HttpException('Event konnte nicht gefunden werden.', 404);
    return event;
  }

  @UseGuards(HttpGuard)
  @Post()
  async createEvent(@Body() eventDto: CreateEventDto): Promise<event> {
    return await this.eventService
      .createEvent(eventDto)
      .catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Patch(':id')
  async updateEvent(
    @Body() eventDto: UpdateEventDto,
    @Param('id') id: string
  ): Promise<event> {
    return await this.eventService
      .updateEvent(id, eventDto)
      .catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<event> {
    return await this.eventService.deleteEvent(id).catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Post(':id/hit')
  async hit(@Param('id') id: string, @Body() hit: HitDto, @AuthzId() authId: string): Promise<{message: string}> {
    const user = await this.userService.findUser(authId);
    const scores = [
      [20, 18, 16],
      [14, 12, 10],
      [8, 6, 4]
    ];
    await this.prismaService.result.create({
      data: {
        result_points: scores[hit.round-1][hit.hit-1].toString(),
        target_target_id: hit.target_id,
        user_user_id: user.user_id,
        event_event_id: id,
      }
    });

    return {
      message: 'Treffer wurde erfolgreich gespeichert.'
    };
  }

  @UseGuards(HttpGuard)
  @Get(':id/scoreboard')
  async scoreboard(@Param('id') id: string): Promise<Scoreboard> {
    return await this.eventService.scoreboard(id).catch(HttpExceptionHandler);
  }
}
