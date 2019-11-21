const {
  request
} = require('graphql-request');

const host = process.env.API_HOST || 'http://localhost:4000';

const callAPI = async (query) => {
  const results = await request(`${host}`, query);
  return results;
};

const allCountsForEntry = entry => {
  const {
    NBLT,
    NBT,
    NBRT,
    NBUT,
    SBLT,
    SBT,
    SBRT,
    SBUT,
    EBLT,
    EBT,
    EBRT,
    EBUT,
    WBLT,
    WBT,
    WBRT,
    WBUT,
    northApproach,
    southApproach,
    eastApproach,
    westApproach
  } = entry;

  return NBLT +
    NBT +
    NBRT +
    NBUT +
    SBLT +
    SBT +
    SBRT +
    SBUT +
    EBLT +
    EBT +
    EBRT +
    EBUT +
    WBLT +
    WBT +
    WBRT +
    WBUT +
    northApproach +
    southApproach +
    eastApproach +
    westApproach;
};

const filterYear = (crimes, year) =>
  crimes.filter(value => new Date(value.date).getFullYear() === year);

const sum = (...values) => values.reduce((a, b) => a + b);

const avg = (...values) => Math.round(sum(...values) / values.length);

module.exports = {
  callAPI,
  allCountsForEntry,
  filterYear,
  sum,
  avg
};