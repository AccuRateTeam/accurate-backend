import {AuthGuard} from "@nestjs/passport";
import {ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class WsGuard extends AuthGuard('jwt') {
    getRequest<T = any>(context: ExecutionContext): T {
        return context.switchToWs().getClient().handshake;
    }
}