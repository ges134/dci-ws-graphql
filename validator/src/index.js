require('dotenv').config();

const express = require('express');

const challenges = require('../data/flags.json');

const app = express();

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

  const challengesNames = challenges.map(c => c.name);

  if (!challengesNames.includes(challenge)) {
    res.status(404).send('the challenge mentionned does not exist');
  }
})