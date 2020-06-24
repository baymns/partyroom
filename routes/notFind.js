const express = require('express');

const router = express.Router();



router.get('/', (req, res) => {
  res.render('regist_login/login');
});

module.exports = 
