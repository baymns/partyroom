const express = require('express');

const router = express.Router();

const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('regist_login/registration')
})

// router.post('/')

module.exports = router

// router.post('/create', async (req, res) => {
//   const { userName, email, password } = req.body;
//   const user = await new User({
//     name: userName,
//     email, password
//   })
//   await user.save()
//   res.redirect('/login')
// })
