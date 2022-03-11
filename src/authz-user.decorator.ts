import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthzUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const id = ctx.switchToHttp().getRequest().user.sub;


  },
);