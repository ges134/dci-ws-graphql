require('dotenv').config();
const {
  aLotOfFines
} = require('./resolvers');

aLotOfFines().then(() => {
  console.log('thou hast resolved')
});