// eslint-disable-next-line no-unused-vars
const trafficLightCount = (root, args, context, info) => {
  const {
    intersection,
    beginHour,
    endHour
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

  return results;
};

module.exports = {
  trafficLightCount
};