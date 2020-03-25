const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res, next) => {
  res.render('login', {
    user: req.user
  });
});

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get('/facebook', passport.authenticate('facebook'));

router.get('/github', passport.authenticate('github'));

router.get(
  '/google/redirect',
  passport.authenticate('google'),
  (req, res, next) => {
    res.redirect('/user/dashboard');
  }
);

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook'),
  (req, res, next) => {
    res.redirect('/user/dashboard');
  }
);

router.get(
  '/github/redirect',
  passport.authenticate('github'),
  (req, res, next) => {
    res.redirect('/user/dashboard');
  }
);

module.exports = router;
