const router = require('express').Router()
const Room = require('../models/room.js')

router.get('/', async (req, res) => {
  const rooms = await Room.find();

  res.render('rooms/roomslist', { rooms });
})

router.get('/create', (req, res) => {
  res.render('rooms/roomform');
})
router.post('/create', async (req, res) => {
  try {
    const {title} = req.body
    const room = new Room({
      title
    });
    await room.save();
    res.redirect(`/rooms/${room._id}`);
  } catch (error) {
    console.log(error)
    res.redirect('/rooms');
  }
})
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const room = await Room.findOne({ id });
    res.render('rooms/room', { room })
  } catch (error) {
    res.redirect('/rooms')
  }

})

module.exports = router
