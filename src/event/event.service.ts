import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { user, event } from "@prisma/client";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventService {
  constructor(
    private prisma: PrismaService
  ) {
  }

  public async createEvent(eventDto: CreateEventDto): Promise<event> {
    return await this.prisma.event.create({
      data: {
        event_name: eventDto.event_name
      }
    });
  }

  public async updateEvent(eventDto: UpdateEventDto, eventId: string): Promise<event> {
    if (!(await this.findEvent(eventId))) {
      throw new HttpException('User konnte nicht gefunden werden.', 400);
    }

    return await this.prisma.event.update({
      where: {
        event_id: eventId
      },
      data: {
        event_name: eventDto.event_name
      }
    });
  }

  public async findEvent(eventId: string): Promise<event> {
    return await this.prisma.event.findFirst({
      where: {
        event_id: eventId
      }
    });
  }

  public async deleteEvent(eventId: string): Promise<event> {
    if (!(await this.findEvent(eventId))) {
      throw new HttpException('User konnte nicht gefunden werden.', 400);
    }

    return await this.prisma.event.delete({
      where: {
        event_id: eventId
      }
    });
  }
}
