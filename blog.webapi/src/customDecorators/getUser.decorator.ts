import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Get user information through Token from HTTP request
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
