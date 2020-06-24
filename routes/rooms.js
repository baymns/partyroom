const router = require('express').Router()
const Room = require('../models/room')

router.get('/', async (req, res) => {
  const rooms = await Room.find();
  res.render('rooms/roomslist', { rooms });
})
router.route('/create')
  .get((req, res) => {
    res.render('roomform');
  })
  .post(async (req, res) => {
    try {
      const { title, shortUrl } = req.body;
      const room = new Room({
        title, shortUrl
      });
      await room.save();
      res.redirect(`/rooms/${room._id}`);
    } catch (error) {
      res.redirect('/rooms');
    }
  })
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findOne({ id });
    res.render('rooms/room', {room})
  } catch (error) {
    res.redirect('/rooms')
  }

})

module.exports = router
