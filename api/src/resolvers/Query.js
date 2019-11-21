const trafficLightCount = (root, args, context) => {
  const {
    intersection,
    beginHour,
    endHour,
    bankCode
  } = args;
  let results = context.trafficLightData.slice(0);

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

const foodInspectionOffenders = (root, args, context) => {
  return context.foodInspectionOffenders;
};

const policeIntervention = (root, args, context) => {
  return context.policeIntervention;
};

module.exports = {
  trafficLightCount,
  foodInspectionOffenders,
  policeIntervention
};