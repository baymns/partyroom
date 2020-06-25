const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
  title: { type: String, required: true },
  createdAt: { type: String, default: new Date() },
  shortUrl: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  author: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = model('room', roomSchema);
