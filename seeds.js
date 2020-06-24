const mongoose = require('mongoose');
const faker = require('faker');
const user = require('./models/user');

mongoose.connect('mongodb://localhost:27017/Partyroom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed 5 users
async function seed() {
  const users = [];
  let count = 1;
  for (let i = 0; i < 5; i += 1) {
    const obj = {
      name: faker.name.findName(),
      password: 12345, // password
      login: 'user' + count, // login
    };
    count++;
    users.push(obj);
  }
  const result = await user.insertMany(users);
  console.log(result);
}

seed();
