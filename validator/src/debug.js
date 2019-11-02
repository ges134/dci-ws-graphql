require('dotenv').config();
const {
  highSteaks
} = require('./resolvers');

highSteaks().then(() => {
  console.log('thou hast resolved')
});