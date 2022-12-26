import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

if (process.env.NODE_ENV === 'prod') {
  db = new PrismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
  }
  db = global.__db__;
  db.$connect();
}

export { db };
