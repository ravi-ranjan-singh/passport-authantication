const express = require('express');

const router = express.Router();

const protect = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/dashboard', protect, (req, res, next) => {
  res.render('profile', {
    name: req.user.username.toUpperCase(),
    user: req.user
  });
});

module.exports = router;
