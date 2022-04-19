import {Injectable} from '@nestjs/common';
import {PrismaService} from '../common/services/prisma.service';
import {event} from '@prisma/client';
import {CreateEventDto} from './dto/create-event.dto';
import {UpdateEventDto} from './dto/update-event.dto';
import {ParcourService} from '../parcour/parcour.service';
import {ApiException} from '../common/exceptions/api.exception';
import {Scoreboard} from './type/scoreboard.type';

@Injectable()
export class EventService {
  constructor(
    private prisma: PrismaService,
    private parcourService: ParcourService
  ) {
  }

  public async scoreboard(eventId: string): Promise<Scoreboard> {
    const event = await this.prisma.event.findFirst({
      where: {
        event_id: eventId
      },
      include: {
        parcour: {
          include: {
            parcour_target: {
              include: {
                target: true
              }
            }
          }
        },
        result: {
          include: {
            user: true
          }
        },
        event_user: {
          include: {
            user: true
          }
        }
      }
    });

    if (!event) {
      throw new ApiException('Event konnte nicht gefunden werden.');
    }

    const targets = event.parcour.parcour_target.map((item) => item.target);
    const results = event.result;
    const output = {
      targets: targets.map((item) => ({
        name: item.target_name,
        id: item.target_id
      })),
      users: {},
      finished: false
    };

    targets.forEach((target) => {
      const targetResults = results.filter((result) => result.target_target_id.trim() === target.target_id.trim());

      targetResults.forEach((targetResult) => {
        if (!output.users[targetResult.user.user_id]) {
          output.users[targetResult.user.user_id] = {
            username: targetResult.user.user_name,
            scores: []
          };
        }
        output.users[targetResult.user.user_id].scores.push(parseInt(targetResult.result_points));
      });
    });

    output.finished = event.event_user.length === Object.keys(output.users).length;

    return output;
  }

  public async listEvents(): Promise<event[]> {
    return await this.prisma.event.findMany();
  }

  public async findEvent(eventId: string): Promise<any> {
    return await this.prisma.event.findFirst({
      where: {
        OR: [
          {
            event_id: eventId,
          },
          {
            event_invite_code: eventId
          }
        ]
      },
      include: {
        parcour: {
          include: {
            parcour_target: {
              include: {
                target: true
              }
            }
          }
        },
        event_user: {
          include: {
            user: true,
          },
        },
        result: {
          include: {
            user: true,
            target: true
          }
        }
      },
    });
  }

  public async createEvent(eventDto: CreateEventDto): Promise<event> {
    if (!(await this.parcourService.findParcour(eventDto.parcour_id))) {
      throw new ApiException('Parkour konnte nicht gefunden werden.', 404);
    }

    return await this.prisma.event.create({
      data: {
        event_name: eventDto.event_name,
        parcour_parcour_id: eventDto.parcour_id,
        event_scoringsystem: eventDto.scoring_system,
        event_invite_code: Math.floor(1000 + Math.random() * 9000).toString()
      },
    });
  }

  public async updateEvent(
    eventId: string,
    eventDto: UpdateEventDto
  ): Promise<event> {
    if (!(await this.findEvent(eventId))) {
      throw new ApiException('Event konnte nicht gefunden werden.', 404);
    }

    return await this.prisma.event.update({
      where: {
        event_id: eventId,
      },
      data: {
        event_name: eventDto.event_name,
      },
    });
  }

  public async deleteEvent(eventId: string): Promise<event> {
    if (!(await this.findEvent(eventId))) {
      throw new ApiException('Event konnte nicht gefunden werden.', 404);
    }

    return await this.prisma.event.delete({
      where: {
        event_id: eventId,
      },
    });
  }

  public async addUserToEvent(eventId: string, userId: string): Promise<event> {
    if (!(await this.findEvent(eventId))) {
      throw new ApiException('Event konnte nicht gefunden werden.', 404);
    }

    return this.prisma.event.update({
      where: {
        event_id: eventId,
      },
      data: {
        event_user: {
          connectOrCreate: {
            where: {
              event_id_user_id: {
                event_id: eventId,
                user_id: userId,
              },
            },
            create: {
              user_id: userId,
            },
          },
        },
      },
      include: {
        parcour: true,
        event_user: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  public async removeUserFromEvent(
    eventId: string,
    userId: string
  ): Promise<event> {
    if (
      !(await this.prisma.event_user.findFirst({
        where: {
          event_id: eventId,
          user_id: userId,
        },
      }))
    ) {
      throw new ApiException(
        'Der User befindet sich nicht in diesem Event.',
        404
      );
    }
    await this.prisma.event_user.delete({
      where: {
        event_id_user_id: {
          event_id: eventId,
          user_id: userId,
        },
      },
    });
    return this.prisma.event.findFirst({
      where: {
        event_id: eventId,
      },
      include: {
        parcour: true,
        event_user: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  public async userInEvent(eventId: string, userId: string): Promise<boolean> {
    return !!(await this.prisma.event_user.findFirst({
      where: {
        user_id: userId,
        event_id: eventId,
      },
    }));
  }
}
