import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody, ConnectedSocket, WsException, OnGatewayConnection, OnGatewayDisconnect
} from "@nestjs/websockets";
import {EventEmitter2, OnEvent} from "@nestjs/event-emitter";
import {event as Event} from "@prisma/client";
import {Server, Socket} from "socket.io";
import {WsGuard} from "../authz/ws.guard";
import {UseGuards} from "@nestjs/common";
import {WsAuthzId} from "../authz/ws-authz-id.decorator";
import {EventService} from "./event.service";
import {UserService} from "../user/user.service";
import {Logger} from '../logger/logger.service';

@WebSocketGateway(4000)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger(EventsGateway.name);

    @WebSocketServer()
    private server: Server;

    constructor(
        private eventService: EventService,
        private userService: UserService,
        private emitter: EventEmitter2
    ) {
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`WebSocket connection from ${client.conn.remoteAddress} (${client.id})`);
    }

    handleDisconnect(client: any) {
        this.logger.log(`${client.conn.remoteAddress} (${client.id}) disconnected`);
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('event.room.join')
    async joinEvent(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket,
        @WsAuthzId() authId
    ): Promise<void> {
        const user = await this.userService.findUser(authId);
        if (!user) {
            throw new WsException('User konnte nicht gefunden werden.');
        }

        // create database relation
        const result = await this.eventService.addUserToEvent(data.eventId, user.user_id);

        // join socket.io room
        client.join(data.eventId);

        // log
        this.logger.log(`User (${user.user_id}) joined Event (${data.eventId})`);

        // broadcast event
        this.emitter.emit('event.refresh', result);
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('event.room.leave')
    async leaveEvent(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket,
        @WsAuthzId() authId
    ): Promise<void> {
        const user = await this.userService.findUser(authId);
        if (!user) {
            throw new WsException('User konnte nicht gefunden werden.');
        }

        // delete database relation
        const result = await this.eventService.removeUserFromEvent(data.eventId, user.user_id);

        // leave socket.io room
        client.leave(data.eventId);

        // log
        this.logger.log(`User (${user.user_id}) left Event (${data.eventId})`);

        // broadcast event
        this.emitter.emit('event.refresh', result);
    }

    @OnEvent('event.refresh')
    async refreshEventHandler(event: Event): Promise<void> {
        this.server.to(event.event_id).emit('event.refresh', event);
    }
}