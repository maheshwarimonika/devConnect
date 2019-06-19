const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const User = require('../../models/User');

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err){
    console.error(err.message)
    res.status(500).send('Server Error');
  }
})

router.post(
  '/',
  [
    check('email','Please include a valid email').isEmail(),
    check(
      'password',
      'Password is required'
    ).exists()
  ],
  async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email })
      if(!user) {
        return res.status(404).json({errors: [ { msg: 'Invalid credentials' } ] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(password)
      console.log(user.password)
      if(!isMatch){
        return res.status(404).json({errors: [ { msg: 'Invalid credentials' } ] });
      }
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

module.exports = router;
