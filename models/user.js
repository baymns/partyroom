const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  login: { type: String, unique: true, required: true },
});

module.exports = model('user', userSchema);

