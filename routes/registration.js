const express = require('express');

const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/rooms');
  }
  res.render('regist_login/registration');
})


router.post('/', async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await new User({
      name: userName,
      email, password
    })
    await user.save();
    if (user) {
      delete user.password;
      req.session.user = user;
      return res.redirect('/rooms');
    }
    else {
      throw new Error();
    }
  }
  catch (error) {
    res.redirect('/registration');
  }
})

module.exports = router;
