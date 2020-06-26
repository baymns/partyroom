const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Room = require('../models/room')

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/rooms')
  } else {
    res.render('regist_login/login');
  }
});

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password })
    if (user) {
      delete user.password
      req.session.user = user;

      //Если пользователь пришел по короткой ссылке!!!
      if (req.session.url) {
        const urlId = req.session.url.slice(7)
        await Room.update({ _id: urlId }, { $push: { users: user._id } })
        return res.redirect(req.session.url)
      }
      return res.redirect('/rooms')
    }
    res.redirect('/registration')
  }
  catch (error) {
    res.redirect('/login',)

  }
})

module.exports = router;
