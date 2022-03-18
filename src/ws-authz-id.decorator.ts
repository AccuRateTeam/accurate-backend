import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const WsAuthzId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToWs().getClient().handshake.user.sub;
  },
);