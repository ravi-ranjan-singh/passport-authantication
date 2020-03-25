const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config/config.env' });

const app = require('./app.js');

mongoose
  .connect(process.env.DATABASE_REMOTE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
  })
  .then(function() {
    console.log('Database connection successful');
  })
  .catch(function(err) {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
