const config = require('nconf');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: config.get('GOOGLE_CLIENT_ID'),
  clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
  callbackURL: config.get('GOOGLE_CALLBACK_URL'),
},
((accessToken, refreshToken, profile, cb) => cb(null, profile))));
