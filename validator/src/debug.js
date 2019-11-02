require('dotenv').config();
const {
  thatsAWholeLotOfCommutes
} = require('./resolvers');

thatsAWholeLotOfCommutes().then(() => {
  console.log('thou hast resolved')
});