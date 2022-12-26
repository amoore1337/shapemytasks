import { Users } from '@prisma/client';
import config from 'nconf';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser<Users>((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.get('GOOGLE_CALLBACK_URL'),
    },
    (_accessToken, _refreshToken, profile, cb) => cb(null, profile)
  )
);
