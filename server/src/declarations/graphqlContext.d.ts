import { GraphQLExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { UserDto } from '../auth/dto/user-dto';

declare module '@nestjs/graphql';
export interface ContextWithUser extends GraphQLExecutionContext {
  req: Request & {
    user: UserDto;
  };
  res: Response;
}
