const router = require("express").Router();
const Room = require('../models/room');

router.post('/:id', async (req, res, next) => {
  const url = req.params.id;
  const randomLink = shortUrlGenerator();
  const shortUrl = '/room/' + randomLink;

  await Room.findOneandUpdate({ id }, { $set: { shortUrl } });
  await Room.save();

});

const shortUrlGenerator = () => {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  let shortUrl = '';

  for (let i = 0; i < 6; i++) {
    const sUrlIndex = Math.floor(Math.random() * (arr_en.length - 1) + 1);
    shortUrl += arr[sUrlIndex];
  }
}

router.get('/:url', async (req, res) => {
  const shortUrl = req.params.url;
  const room = await Room.findOne({ shortUrl });
  req.session.url = `/rooms/${room.id}`;
  res.redirect(req.session.url);
});

module.exports = router
