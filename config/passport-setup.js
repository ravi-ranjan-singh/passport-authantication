require('./../passport-setup/serialize-deserialize');
// importing files
const passport = require('passport');
const createRedirectFunction = require('./../passport-setup/redirectFunction');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const GithubStrategy = require('passport-github');
const {
  strategyOptionsForGoogle,
  strategyOptionsForFacebook,
  strategyOptionsForGithub
} = require('./../passport-setup/strategyOptions');

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
