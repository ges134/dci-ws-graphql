require('dotenv').config();
const {
  trucksAndMoreTrucks
} = require('./resolvers');

trucksAndMoreTrucks().then(() => {
  console.log('thou hast resolved')
});