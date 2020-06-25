const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema({
  category: { type: String, required: false },
  products: [
    {
      title: { type: String, require: true },
      cost: { type: Number },
      username: { type: String },
      userid: { type: Schema.Types.ObjectId, ref: 'user' },
      isbuy: { type: Boolean },
      uid: String,
    },
  ],
  roomid: { type: Schema.Types.ObjectId, ref: 'room' },
});

module.exports = model('whishlist', wishlistSchema);
