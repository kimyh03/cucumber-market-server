import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const currentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    return await GqlExecutionContext.create(ctx).getContext().user;
  },
);
