import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { event } from "@prisma/client";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import {ParcourService} from "../parcour/parcour.service";
import {ApiException} from '../api.exception';

@Injectable()
export class EventService {
  constructor(
    private prisma: PrismaService,
    private parcourService: ParcourService
  ) {
  }

  public async addUserToEvent(eventId: string, userId: string): Promise<event> {
    if (!(await this.findEvent(eventId, false))) {
      throw new ApiException('Event konnte nicht gefunden werden.', 404);
    }

    return this.prisma.event.update({
      where: {
        event_id: eventId
      },
      data: {
        event_user: {
          connectOrCreate: {
            where: {
              event_id_user_id: {
                event_id: eventId,
                user_id: userId
              }
            },
            create: {
              user_id: userId
            }
          }
        }
      },
      include: {
        event_user: {
          include: {
            user: true
          }
        }
      }
    })
  }

  public async removeUserFromEvent(eventId: string, userId: string): Promise<event> {
    if (!(await this.prisma.event_user.findFirst({
      where: {
        event_id: eventId,
        user_id: userId
      }
    }))) {
      throw new ApiException('Der User befindet sich nicht in diesem Event.', 404);
    }
    await this.prisma.event_user.delete({
      where: {
        event_id_user_id: {
          event_id: eventId,
          user_id: userId
        }
      }
    });
    return this.prisma.event.findFirst({
      where: {
        event_id: eventId
      },
      include: {
        event_user: {
          include: {
            user: true
          }
        }
      }
    });
  }

  public async userInEvent(eventId: string, userId: string): Promise<boolean> {
    return !!(await this.prisma.event_user.findFirst({
      where: {
        user_id: userId,
        event_id: eventId
      }
    }))
  }

  public async createEvent(eventDto: CreateEventDto): Promise<event> {
    if (!(await this.parcourService.findParcour((eventDto.parcour_id)))) {
      throw new ApiException('Parkour konnte nicht gefunden werden.', 404);
    }

    return await this.prisma.event.create({
      data: {
        event_name: eventDto.event_name,
        parcour_parcour_id: eventDto.parcour_id
      }
    });
  }

  public async updateEvent(eventDto: UpdateEventDto, eventId: string): Promise<event> {
    if (!(await this.findEvent(eventId))) {
      throw new ApiException('Event konnte nicht gefunden werden.', 404);
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

  public async findEvent(eventId: string, withParcour: boolean = true): Promise<event> {
    const event = await this.prisma.event.findFirst({
      where: {
        event_id: eventId
      },
      include: {
        parcour: true
      }
    });
    if (!event) {
      throw new ApiException('Event konnte nicht gefunden werden.', 404);
    }
    return event;
  }

  public async deleteEvent(eventId: string): Promise<event> {
    if (!(await this.findEvent(eventId))) {
      throw new ApiException('Event konnte nicht gefunden werden.', 404);
    }

    return await this.prisma.event.delete({
      where: {
        event_id: eventId
      }
    });
  }
}
