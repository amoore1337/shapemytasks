const passport = require('passport');
const { loginFromGoogle } = require('../services/auth.service.ts');

function wrapAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

module.exports = (router) => {
  router.get('/logout', (_, res) => {
    res.clearCookie('t_id');
    res.sendStatus(200);
  });

  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    wrapAsync(async (req, res) => {
      const token = await loginFromGoogle(req.user);
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
