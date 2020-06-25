const express = require('express');

const router = express.Router();

router.get('/',async (req, res, next)=>{
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid")
      res.redirect('/')
    } catch (error) {
      next(error)
    }
  } else {
    res.redirect('/login')
  }
})

module.exports = router;
