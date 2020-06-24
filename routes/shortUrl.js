const router = require(".");

router.post('/room/:id', async (req, res, next) => {
  const url = req.params.id;
  const randomLink = shortUrlGenerator();
  const shortUrl = '/room/' + shortUrl;

  await Room.findOneandUpdate({ id: url }, { $set: { shortUrl } });
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

router.get('/:shorturl', async (req, res, next) => {
  const room = await Room.findOne({ shortUrl: req.params.shortUrl });
  res.redirect('/room//' + room._id);
});

// const roomSchema = new Schema({
//   title: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   shortUrl: String,
//   users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
//   author: { type: Schema.Types.ObjectId, ref: 'user' },
// });
