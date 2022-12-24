export = {
  Query: {
    heartbeat: (_: any, __: any, { user }: any) => ({ authenticated: !!user }),
  },
};
