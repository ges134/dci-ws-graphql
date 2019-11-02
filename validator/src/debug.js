require('dotenv').config();
const {
  whereDoPedestriansGo
} = require('./resolvers');

whereDoPedestriansGo().then(() => {
  console.log('thou hast resolved')
});