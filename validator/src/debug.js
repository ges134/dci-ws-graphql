require('dotenv').config();
const {
  howLongBeforeTheJudgment
} = require('./resolvers');

howLongBeforeTheJudgment().then(() => {
  console.log('thou hast resolved')
});