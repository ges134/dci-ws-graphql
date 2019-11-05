const parseAmount = amount => {
  const splitted = amount.split(' ');
  return splitted.length === 4 ? parseInt(splitted[0]) * 1000 + parseInt(splitted[1]) : parseInt(splitted[0]);
};

// Date format 'MM-DD-YYYY'
const toDate = dateString => {

  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'juin', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const splitted = dateString.split(' ');

  return new Date(`${months.indexOf(splitted[1]) + 1}/${splitted[0]}/${splitted[2]}`);
};

module.exports = {
  parseAmount,
  toDate
};