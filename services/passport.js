const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ userId: profile.id });
      if (existingUser) {
        // RECORD FOUND!
        done(null, existingUser);
      } else {
        const user = await new User({ userId: profile.id, firstName: profile.name.givenName, lastName: profile.name.familyName, email: profile.emails[0].value, profilePicture: profile.photos[0].value, loginPlatform: 'Google' }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const existingUser = await User.findOne({ userId: profile.id });
      if (existingUser) {
        // RECORD FOUND!
        done(null, existingUser);
      } else {
        const user = await new User({ userId: profile.id, firstName: profile.name.givenName, lastName: profile.name.familyName, email: profile.emails[0].value, profilePicture: profile.photos[0].value, loginPlatform: 'Facebook' }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
	'local-login',
	new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
			proxy: true
		},
    async (username, password, done) => {
      const existingUser = await User.findOne({ username: username, password: password });
      if (existingUser) {
        done(null, existingUser);
      } else {
        return done(null, false);
      }
		}
	)
);
