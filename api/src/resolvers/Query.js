// eslint-disable-next-line no-unused-vars
const trafficLightCount = (root, args, context, info) => {
  const {
    intersection,
    beginHour,
    endHour,
    bankCode
  } = args;
  let results = context.trafficLightData;
  if (intersection) {
    results = results.filter(value => value.intersectionName === intersection);
  }
  if (beginHour || endHour) {
    const filterBeginHour = beginHour || 0;
    const filterEndHour = endHour || 23;

    results = results.filter(value => value.hour > filterBeginHour && value.hour < filterEndHour);
  }
  if (bankCode) {
    results = results.filter(value => value.bankCode === bankCode);
  }

  return results;
};

// eslint-disable-next-line no-unused-vars
const foodInspectionOffenders = (root, args, context, info) => {
  return context.foodInspectionOffenders;
};

// eslint-disable-next-line no-unused-vars
const policeIntervention = (root, args, context, info) => {
  return context.policeIntervention;
};

module.exports = {
  trafficLightCount,
  foodInspectionOffenders,
  policeIntervention
};