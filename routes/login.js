const express = require('express');

const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('regist_login/login');
});

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login, password })
    if (user) {
      delete user.password
      req.session.user = user;
      return res.redirect('/rooms')
    }
    else {
      throw new Error()
    }
    } 
    catch (error) {
      console.log(error)
      res.render('regist_login/login', { error })

    }
    const { login, password } = req.body;
    const user = await User.find({ login })
    if (user.login === login && user.password === password) {
      delete user.password
      req.session.user = user;

      return res.redirect('/rooms')
    }
    res.redirect('/')
  })



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



module.exports = router;
