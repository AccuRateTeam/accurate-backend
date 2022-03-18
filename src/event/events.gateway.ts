import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    SubscribeMessage,
    MessageBody, WsResponse, ConnectedSocket
} from "@nestjs/websockets";
import {OnEvent} from "@nestjs/event-emitter";
import {event as Event} from "@prisma/client";
import {Server, Socket} from "socket.io";
import {WsGuard} from "../ws.guard";
import {UseGuards} from "@nestjs/common";

@WebSocketGateway(4000)
export class EventsGateway implements OnGatewayConnection {
    @WebSocketServer()
    private server: Server;

    @UseGuards(WsGuard)
    async handleConnection(client: Socket, ...args: any[]): Promise<any> {
        client.join('cl0w6457z00072t2o1t2kugf1');
    }

    @OnEvent('event.user.joined')
    async userJoinedHandler(event: Event): Promise<void> {
        this.server.to(event.event_id).emit('event.user.joined', event);
    }

    @OnEvent('event.user.left')
    async userLeftHandler(event: Event): Promise<void> {
        this.server.to(event.event_id).emit('event.user.left', event);
    }
}