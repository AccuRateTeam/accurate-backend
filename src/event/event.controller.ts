import {Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UseGuards} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { event } from "@prisma/client";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import {AuthzUser} from "../authz-user.decorator";
import {AuthzId} from "../authz-id.decorator";
import {UserService} from "../user/user.service";
import {EventEmitter2} from "@nestjs/event-emitter";

@Controller('event')
export class EventController {
  constructor(
    private eventService: EventService,
    private userService: UserService,
    private emitter: EventEmitter2
  ) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/join')
  async joinEvent(@Param('id') id: string, @AuthzId() authId): Promise<event> {
    if (!(await this.userService.findUser(authId))) {
      throw new HttpException('User konnte nicht gefunden werden.', 404);
    }
    const result = await this.eventService.addUserToEvent(id, (await this.userService.findUser(authId)).user_id);
    this.emitter.emit('event.user.joined', result);
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/leave')
  async leaveEvent(@Param('id') id: string, @AuthzId() authId): Promise<event> {
    if (!(await this.userService.findUser(authId))) {
      throw new HttpException('User konnte nicht gefunden werden.', 404);
    }
    const result = await this.eventService.removeUserFromEvent(id, (await this.userService.findUser(authId)).user_id);
    this.emitter.emit('event.user.left', result);
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findEvent(@Param('id') id: string): Promise<event> {
    const event = await this.eventService.findEvent(id);
    if (!event) {
      throw new HttpException('Event konnte nicht gefunden werden.', 404);
    }
    return event;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createEvent(@Body() eventDto: CreateEventDto): Promise<event> {
    return await this.eventService.createEvent(eventDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateEvent(@Body() eventDto: UpdateEventDto, @Param('id') id: string): Promise<event> {
    return this.eventService.updateEvent(eventDto, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<event> {
    return this.eventService.deleteEvent(id);
  }
}
