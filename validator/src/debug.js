require('dotenv').config();
const {
  whenDoTheyHappen
} = require('./resolvers');

whenDoTheyHappen().then(() => {
  console.log('thou hast resolved')
});