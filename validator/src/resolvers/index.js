const {
  request
} = require('graphql-request');

const challenges = require('../../data/flags.json');

const host = process.env.API_HOST || 'http://localhost:4000';

const firstBitcoin = {
  name: 'first-bitcoin',
  resolver: async submission => {
    const query = `
      query {
        transactions(currency: Bitcoin, orderCol: blockTimestamp, top: 1) {
          fee
        }
      }
    `;
    const result = await request(`${host}/`, query);
    console.log(result);
  }
};

module.exports = {
  firstBitcoin
};