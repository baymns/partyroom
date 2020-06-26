const express = require('express');

const router = express.Router();

const User = require('../models/user')
const Room = require('../models/room')

router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/rooms')
  }
  res.render('regist_login/registration')
})


router.post('/', async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await new User({
      name: userName,
      email, password
    })
    await user.save()
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
    else {
      throw new Error()
    }
  }
  catch (error) {
    res.redirect('/registration')
  }
})

module.exports = router
