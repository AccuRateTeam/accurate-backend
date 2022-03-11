import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { event } from "@prisma/client";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Controller('event')
export class EventController {
  constructor(
    private eventService: EventService
  ) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findEvent(@Param('id') id: string): Promise<event> {
    return await this.eventService.findEvent(id);
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
