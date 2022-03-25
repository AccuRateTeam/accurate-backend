import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthzId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user.sub;
  }
);

export const WsAuthzId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToWs().getClient().handshake.user.sub;
  }
);
