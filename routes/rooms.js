const router = require('express').Router()
const Room = require('../models/room.js')

const shortUrlGenerator = () => {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  let shortUrl = '';

  for (let i = 0; i < 6; i++) {
    const sUrlIndex = Math.floor(Math.random() * (arr.length - 1) + 1);
    shortUrl += arr[sUrlIndex];
  }
  return shortUrl;
}

router.get('/', async (req, res) => {
  const rooms = await Room.find();

  res.render('rooms/roomslist', { rooms });
})

router.get('/create', (req, res) => {
  res.render('rooms/roomform');
})
router.post('/create', async (req, res) => {
  try {
    const { title } = req.body
    const room = new Room({
      title
    });
    await room.save();
    res.redirect(`/rooms/${room._id}`);
  } catch (error) {
    //console.log(error)
    res.redirect('/rooms');
  }
})
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const randomLink = shortUrlGenerator();
    const shortUrl = '/rooms/' + randomLink;

    await Room.findOneandUpdate({ id }, { $set: { shortUrl } });
    await Room.save();
    const room = await Room.findOne({ id });
    res.render('rooms/room', { room })
  } catch (error) {
    res.redirect('/rooms')
  }

})

// Нужно уточнить куда ведет ручка!!!
router.get('/:shorturl', async (req, res, next) => {
  const room = await Room.findOne({ shortUrl: req.params.shortUrl });
  res.redirect('/rooms/' + room._id);
});

module.exports = router
