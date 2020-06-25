const express = require('express');
const { v4: uuidv4 } = require('uuid');

const WishListModel = require('../models/wishlist')

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { wishListId } = req.params;
  const wishlist = await WishListModel.findOne({ wishListId })
  res.render('rooms/room')
})



router.post('/:id', async (req, res) => {
  const { title, cost, isbuy } = req.body;
  const { username, userid } = req.locals;
  const obj = {
    title: title,
    cost,
    username,
    userid,
    isbuy,
    uid: uuidv4(),
  }
  const wishListId = req.params.id;
  await WishListModel.findOneAndUpdate({ id: wishListId }, obj)
  res.end()
})

module.exports = router;
