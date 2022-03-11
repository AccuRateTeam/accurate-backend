import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthzId } from "../authz-id.decorator";
import { event, user } from "@prisma/client";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Controller('event')
export class EventController {
  constructor(
    private eventService: EventService
  ) {
  }

  // TODO: better type casting (with pipes)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findEvent(@Param('id') id: string): Promise<event> {
    return await this.eventService.findEvent(parseInt(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createEvent(@Body() eventDto: CreateEventDto): Promise<event> {
    return await this.eventService.createEvent(eventDto);
  }

  // TODO: better type casting (with pipes)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateEvent(@Body() eventDto: UpdateEventDto, @Param('id') id: string): Promise<event> {
    return this.eventService.updateEvent(eventDto, parseInt(id));
  }

  // TODO: better type casting (with pipes)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<event> {
    return this.eventService.deleteEvent(parseInt(id));
  }
}
