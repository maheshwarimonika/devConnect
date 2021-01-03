const express = require('express');
const mongoose = require('mongoose');

//validation and authentication module
const passport = require('passport');

const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();



//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//body parser init middleware
app.use(express.json({ extended: false }))

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport)

//use Routes
app.use('/api/users',users)
app.use('/api/auth',auth)
app.use('/api/profile',profile)
app.use('/api/posts',posts)


app.get('/',(req,res) => res.send("Hello"))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))
