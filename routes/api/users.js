const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


//Load user model
const User = require('../../models/User');

// @route GET api/users/test
// @desc Tests post route
// @access Public
router.get('/test', (req,res) =>
  res.json({
    msg: 'Users works'
  })
);

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  '/',
  [
    check('name','Name is required')
    .not()
    .isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email })
      if(user){
        return res.status(404).json({errors: [ { msg: 'User already exists' } ] });
      }
      //get users gravatar
      const avatar = gravatar.url(req.body.email, {
        s: '200', //Size
        r: 'pg', //Rating
        d: 'mm' //Default
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 3600 },
        (err,token) => {
          if (err) throw err;
          res.json({ token })
        });

      //return res.send('User registered')
    } catch(err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route GET api/users/login
// @desc Login user / Returning JWT token
// @access Public
router.post('/login',(req, res) => {

  const { errors, isValid } = validateLoginInput(req.body)

  if(!isValid){
    return res.status(400).json(errors)

  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email:email})
  .then(user => {
    //Check user
    if(!user){
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    //Check for password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(isMatch){
        //User Matched
        const payload = { id:user.id, name: user.name, avatar: user.avatar }
        //res.json({msg:'Success'})
        //Sign token
        jwt.sign(payload, keys.secretOrKey, { expiresIn:3600 }, (err,token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
        })
      } else {
        errors.password = 'Password incorrect'
        return res.status(400).json(errors);
      }
    })
  })
});

// @route GET api/users/current
// @desc Return current User
// @access Private
router.get('/current', passport.authenticate('jwt',{ session:false }), (req,res) => {
  const data = {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    avatar: req.user.avatar
  }
  res.json({ msg:'Success' , data:data})
});

module.exports = router;
