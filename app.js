const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportStrategy = require('./config/passport-setup');
const authRouter = require('./routes/auth-router');
const userRouter = require('./routes/user-router');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.get('/', (req, res, next) => {
  res.render('home', {
    user: req.user
  });
});

module.exports = app;
