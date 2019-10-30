require('dotenv').config();
const {
  trafficLightCount
} = require('./resolvers');

trafficLightCount().then(() => {
  console.log('thou hast resolved')
});