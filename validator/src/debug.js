require('dotenv').config();
const {
  firstBitcoin
} = require('./resolvers');

firstBitcoin.resolver().then(() => {
  console.log('thou hast resolved')
});