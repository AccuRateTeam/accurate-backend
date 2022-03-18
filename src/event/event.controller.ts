import {Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UseGuards} from "@nestjs/common";
import { event } from "@prisma/client";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import {HttpGuard} from '../authz/http.guard';
import {HttpExceptionHandler} from '../exception.handlers';

@Controller('event')
export class EventController {
  constructor(
    private eventService: EventService,
  ) {
  }

  @UseGuards(HttpGuard)
  @Get(':id')
  async findEvent(@Param('id') id: string): Promise<event> {
    return await this.eventService.findEvent(id).catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Post()
  async createEvent(@Body() eventDto: CreateEventDto): Promise<event> {
    return await this.eventService.createEvent(eventDto).catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Patch(':id')
  async updateEvent(@Body() eventDto: UpdateEventDto, @Param('id') id: string): Promise<event> {
    return this.eventService.updateEvent(eventDto, id).catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<event> {
    return this.eventService.deleteEvent(id).catch(HttpExceptionHandler);
  }
}
