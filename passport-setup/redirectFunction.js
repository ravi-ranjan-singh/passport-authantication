const User = require('./../models/user');

module.exports = dbPropertyName => {
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
