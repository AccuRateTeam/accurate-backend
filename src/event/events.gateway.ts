import {WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {OnEvent} from "@nestjs/event-emitter";
import {event as Event} from "@prisma/client";
import {Server} from "socket.io";

@WebSocketGateway(4000)
export class EventsGateway {
    @WebSocketServer()
    private server: Server;

    @OnEvent('event.user.joined')
    async userJoinedHandler(event: Event): Promise<void> {
        this.server.emit('event.user.joined', event);
    }

    @OnEvent('event.user.left')
    async userLeftHandler(event: Event): Promise<void> {
        this.server.emit('event.user.left', event);
    }
}