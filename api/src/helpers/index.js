const parseAmount = amount => {
  const splitted = amount.split(' ');
  return splitted.length === 4 ? parseInt(splitted[0]) * 1000 + parseInt(splitted[1]) : parseInt(splitted[0]);
};

module.exports = {
  parseAmount
};