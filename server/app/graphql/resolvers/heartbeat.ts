import { GraphContext } from '../helpers';

export = {
  Query: {
    heartbeat: (_: null, __: null, { user }: GraphContext) => ({ authenticated: !!user }),
  },
};
