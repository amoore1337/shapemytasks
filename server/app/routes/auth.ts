import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import passport from 'passport';
import { loginFromGoogle } from '../models/auth';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

function wrapAsync(fn: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

export = (router: Router) => {
  router.get('/logout', (_, res) => {
    res.clearCookie('t_id');
    res.sendStatus(200);
  });

  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    wrapAsync(async (req, res) => {
      const token = await loginFromGoogle(req.user! as any);
      res.cookie('t_id', token, { httpOnly: true });

      // Close the tab or popup that the google auth page was opened in:
      res.send(`
      <!DOCTYPE html>
      <html>
      <body>

      <script>window.close();</script>

      </body>
      </html>
    `);
    })
  );
};
