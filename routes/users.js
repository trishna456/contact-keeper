const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../model/User');

const router = express.Router();

// @route    POST api/users
// @desc     Registers a user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Please enter name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //bcrypt also returns promises, use async await
    // use try catch bcz we are dealing with db, bcrypt which uses promises etc

    const { name, email, password } = req.body;

    try {
      //checking if a user already exists with that email
      let user = await User.findOne({ email });
      //findOne method we can use with mongoose
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        //not yet saved in db, only a new instance of User is created
        name,
        email,
        password
      });
      //before saving it in the db, hash the password with bcrypt
      //what is salt??
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //res.send('user saved in db');

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'), //secret key
        {
          //options
          expiresIn: 360000
        },
        (err, token) => {
          //callback function
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
