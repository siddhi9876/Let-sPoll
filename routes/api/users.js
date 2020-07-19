const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const passport = require('passport');


//Load Validator
const validateRegisterInput = require('../../validator/Register');
const validateLoginInput = require('../../validator/Login');


//Load User model
const User = require('../../models/Users');


//@router GET api/users/test
//@desc Test users route
//@access Public
router.get('/test', (req, res) => res.json({
  msg: 'users worked'
}));

//@router POST api/users/register
//@desc Register User
//@access Public
router.post('/register', (req, res) => {

  const {errors, isValid} = validateRegisterInput(req.body);

  //Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
      .then(user => {
        if(user) {
          errors.email = 'Email Already Exists';
          return res.status(400).json(errors);
        } else {

          const avatar = gravatar.url(req.body.email, {
            s: '200', //Size
            r: 'pg', //Rating
            d: 'mm' //Default
          });

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar: avatar,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {

              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                     .then(user =>res.json(user))
                     .catch(err => console.log(err));
            })
          })
      }})
});

//@router POST api/users/login
//@desc Login User
//@access Public
router.post('/login', (req, res) => {

  const {errors, isValid} = validateLoginInput(req.body);

  //Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email}).then(user => {

    //Check for user
    if(!user) {
      errors.email = 'User not found';
      return res.status(400).json(errors);
    } 

    //Check for password

    bcrypt.compare(password, user.password).then(isMatch => {

      if(isMatch) {

        //User matched

        //JWT payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar};

        //Sign Token

        jwt.sign(
          payload,
          keys.secretOrKey,
          {expiresIn: 3600},
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          } 
        )
      } else {
        errors.password = 'Password Incorrect';
        return res.status(400).json(errors);
      }
    })
  })
})

//@router GET api/users/current
//@desc Return current user
//@access Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req);
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})
module.exports = router;