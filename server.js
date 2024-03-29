const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const rooms = require('./routes/api/rooms');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/rooms', rooms);

app.get('/', (req, res) => {
  console.log(req.body.name);
  res.send('Hello World !')
});

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));