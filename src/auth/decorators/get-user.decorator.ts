import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (roles = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const user = ctx.getContext().req.user;

    if (!user) throw new InternalServerErrorException('User not found');

    return user;
  },
);
