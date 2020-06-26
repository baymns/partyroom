const express = require('express');

const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/rooms');
  }
  res.render('regist_login/login');
});

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password })
    if (user) {
      delete user.password
      req.session.user = user;
      return res.redirect('/rooms')
    }
    res.redirect('/registration')
  }
  catch (error) {
    res.redirect('/login',)

  }
})


// const { email, password } = req.body;
// const user = await User.find({ email })
// if (user.email === login && user.password === password) {
//   delete user.password
//   req.session.user = user;
//   return res.redirect('/rooms')
// }
// res.redirect('/')

// router.post('/', async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email);
//   const user = await User.findOne({ email })
//   if (user.email === email && user.password === password) {
//     delete user.password
//     req.session.user = user;

//     return res.redirect('/entries')
//   }
//   res.redirect('/login')
// })



// else {
//   throw new Error()
// }
module.exports = router;
