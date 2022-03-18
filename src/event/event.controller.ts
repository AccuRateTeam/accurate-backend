import {Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UseGuards} from "@nestjs/common";
import { event } from "@prisma/client";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import {HttpGuard} from '../authz/http.guard';

@Controller('event')
export class EventController {
  constructor(
    private eventService: EventService,
  ) {
  }

  @UseGuards(HttpGuard)
  @Get(':id')
  async findEvent(@Param('id') id: string): Promise<event> {
    const event = await this.eventService.findEvent(id);
    if (!event) {
      throw new HttpException('Event konnte nicht gefunden werden.', 404);
    }
    return event;
  }

  @UseGuards(HttpGuard)
  @Post()
  async createEvent(@Body() eventDto: CreateEventDto): Promise<event> {
    return await this.eventService.createEvent(eventDto);
  }

  @UseGuards(HttpGuard)
  @Patch(':id')
  async updateEvent(@Body() eventDto: UpdateEventDto, @Param('id') id: string): Promise<event> {
    return this.eventService.updateEvent(eventDto, id);
  }

  @UseGuards(HttpGuard)
  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<event> {
    return this.eventService.deleteEvent(id);
  }
}
