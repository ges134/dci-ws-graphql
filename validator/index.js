const express = require('express');

const app = express();

const challenges = ['chall'];
const flags = ['flag-|-|3110'];
const resolvers = [(submission) => {
  // TODO: faire un resolver.
}]

app.post('/', (req, res) => {
  const {
    challenge,
    submission
  } = req.body;
  if (!challenge) {
    res.status(400).send('a challenge name is needed');
  }

  if (!submission) {
    res.status(400).send('a challenge submission is needed');
  }

  if (!challenge.includes(challenge)) {
    res.status(404).send('the challenge mentionned does not exist');
  }
})