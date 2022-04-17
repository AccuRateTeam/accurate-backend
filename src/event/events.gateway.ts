import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsException,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { event as Event } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { WsGuard } from '../common/guards/ws.guard';
import { UseGuards } from '@nestjs/common';
import { WsAuthzId } from '../common/decorators/authz-id.decorator';
import { EventService } from './event.service';
import { UserService } from '../user/user.service';
import { Logger } from '../logger/logger.service';
import { JoinEventDto } from './dto/join-event.dto';
import { LeaveEventDto } from './dto/leave-event.dto';
import {HttpExceptionHandler, WsExceptionHandler} from '../common/exception.handlers';
import {Scoreboard} from './type/scoreboard.type';

@WebSocketGateway(4000, {
  cors: {
    origin: '*',
    methods: '*'
  }
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  private server: Server;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private emitter: EventEmitter2
  ) {}

  handleConnection(client: Socket) {
    this.logger.log(
      `WebSocket connection from ${client.conn.remoteAddress} (${client.id})`
    );
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`${client.conn.remoteAddress} (${client.id}) disconnected`);
  }

  // TODO: implement data validation
  @UseGuards(WsGuard)
  @SubscribeMessage('event.room.join')
  async joinEvent(
    @MessageBody() data: JoinEventDto,
    @ConnectedSocket() client: Socket,
    @WsAuthzId() authId
  ): Promise<void> {
    const user = await this.userService.findUser(authId);
    if (!user) {
      throw new WsException('User konnte nicht gefunden werden.');
    }

    // create database relation
    const result = await this.eventService
      .addUserToEvent(data.event_id, user.user_id)
      .catch(WsExceptionHandler);

    // join socket.io room
    client.join(data.event_id);

    // log
    this.logger.log(`User (${user.user_id}) joined Event (${data.event_id})`);

    // broadcast event
    this.emitter.emit('event.refresh', result);
    this.emitter.emit('event.scoreboard', {
      event_id: data.event_id,
      scoreboard: await this.eventService.scoreboard(data.event_id).catch(HttpExceptionHandler)
    });
  }

  // TODO: implement data validation
  @UseGuards(WsGuard)
  @SubscribeMessage('event.room.leave')
  async leaveEvent(
    @MessageBody() data: LeaveEventDto,
    @ConnectedSocket() client: Socket,
    @WsAuthzId() authId
  ): Promise<void> {
    const user = await this.userService.findUser(authId);
    if (!user) {
      throw new WsException('User konnte nicht gefunden werden.');
    }

    // delete database relation
    const result = await this.eventService
      .removeUserFromEvent(data.event_id, user.user_id)
      .catch(WsExceptionHandler);

    // log
    this.logger.log(`User (${user.user_id}) left Event (${data.event_id})`);

    // broadcast event
    this.emitter.emit('event.refresh', result);

    // leave socket.io room
    client.leave(data.event_id);
  }

  @OnEvent('event.refresh')
  async refreshEventHandler(event: Event): Promise<void> {
    this.server.to(event.event_id).emit('event.refresh', event);
  }

  @OnEvent('event.scoreboard')
  async refreshScoreboard(data: {event_id: string, scoreboard: Scoreboard}): Promise<void> {
    this.server.to(data.event_id).emit('event.scoreboard', data.scoreboard);
  }
}
