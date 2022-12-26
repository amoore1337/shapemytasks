import { Users } from '@prisma/client';
import { GraphQLError } from 'graphql';

export interface GraphContext {
  user: Users | null;
}

export interface AuthenticatedGraphContext extends GraphContext {
  user: Users;
}

export type ResolverHandler<P = unknown, A = unknown, C = GraphContext, T = unknown> = (
  parent: P,
  args: A,
  context: C
) => T | null | Promise<T | null>;

export interface IdParam {
  id: string;
}

export type Response<T> = T | null | Error | Promise<T | null | Error>;

export function withAuthRequired<P, A, T>(
  handler: ResolverHandler<P, A, AuthenticatedGraphContext, T>
): ResolverHandler<P, A, GraphContext, T> {
  return (parent, args, context) => {
    rejectUnauthenticated(context.user);

    return handler(parent, args, context as AuthenticatedGraphContext);
  };
}

function rejectUnauthenticated(currentUser: Users | null) {
  if (!currentUser) {
    throw new GraphQLError('You are not authorized to perform this action.', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
}
