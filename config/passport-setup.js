const passport = require('passport');
const User = require('./../models/user');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const GithubStrategy = require('passport-github');

const strategyOptionsForGoogle = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/redirect'
};

const strategyOptionsForFacebook = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/redirect'
};

const strategyOptionsForGithub = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/redirect'
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
  }
});

const createRedirectFunction = dbPropertyName => {
  return async (accessToken, refreshToken, profile, done) => {
    let body = {};
    body[dbPropertyName] = profile.id;
    try {
      let user = await User.findOne(body);
      if (!user) {
        body.username = profile.displayName;
        const newUser = await User.create(body);
        done(null, newUser);
      } else {
        done(null, user);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

passport.use(
  new GoogleStrategy(
    strategyOptionsForGoogle,
    createRedirectFunction('googleId')
  )
);

passport.use(
  new FacebookStrategy(
    strategyOptionsForFacebook,
    createRedirectFunction('facebookId')
  )
);

passport.use(
  new GithubStrategy(
    strategyOptionsForGithub,
    createRedirectFunction('githubId')
  )
);
