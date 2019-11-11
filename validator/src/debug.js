require('dotenv').config();
const {
  breakdownOfCrimes
} = require('./resolvers');

breakdownOfCrimes().then(() => {
  console.log('thou hast resolved')
});