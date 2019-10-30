// eslint-disable-next-line no-unused-vars
const trafficLightCount = (root, args, context, info) => {
  const {
    intersection
  } = args;
  if (intersection) {
    return context.trafficLightData.filter(value => value.intersectionName === intersection);
  }

  return context.trafficLightData;
};

module.exports = {
  trafficLightCount
};