import { paramCase } from 'change-case';
import express, { Request, Response } from 'express';
import routes from 'require-dir';

export = (app: any) => {
  app.get('/api/ping', (_: Request, res: Response) => {
    res.send('pong');
  });

  Object.keys(routes('.')).forEach((routeName) => {
    const router = express.Router();
    require(`./${routeName}`)(router);

    console.log('change??', paramCase);
    app.use(`/api/${paramCase(routeName)}`, router);
  });
};
