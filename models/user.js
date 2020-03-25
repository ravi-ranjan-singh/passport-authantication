const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  googleId: {
    type: String
  },
  facebookId: {
    type: String
  },
  githubId: {
    type: String
  }
});

module.exports = mongoose.model('user', userSchema);
