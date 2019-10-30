const {
  request
} = require('graphql-request');

const host = process.env.API_HOST || 'http://localhost:4000';

const trafficLightCount = async () => {
  const query = `
    query {
      trafficLightCount(intersection: "Notre-Dame / Peel") {
        bankCode
        bankCodeDescription
        NBLT
        NBT
        NBRT
        NBUT
        SBLT
        SBT
        SBRT
        SBUT
        EBLT
        EBT
        EBRT
        EBUT
        WBLT
        WBT
        WBRT
        WBUT
        northApproach
        southApproach
        eastApproach
        westApproach
      }
    }
  `;

  const {
    trafficLightCount
  } = await request(`${host}/`, query);

  const result = trafficLightCount;

  let totalCar = 0,
    totalBike = 0,
    totalPedestrian = 0,
    totalOther = 0;

  for (let i = 0; i < result.length; i++) {
    const {
      bankCode,
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
    } = result[i];
    if (bankCode === 0) {
      totalCar +=
        NBLT +
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
        WBUT;
    } else if (bankCode === 10) {
      totalPedestrian +=
        northApproach + southApproach + eastApproach + westApproach;
    } else if (bankCode == 11) {
      totalBike +=
        northApproach + southApproach + eastApproach + westApproach;
    } else {
      totalOther += NBLT +
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
    }
  }

  const total = totalBike + totalCar + totalPedestrian + totalOther;

  const percentageBike = Math.round(totalBike / total * 100);
  const percentageCar = Math.round(totalCar / total * 100);
  const percentagePedestrian = Math.round(totalPedestrian / total * 100);

  console.log(`pb:${percentageBike};pc:${percentageCar};pp:${percentagePedestrian}`);
};

module.exports = {
  trafficLightCount
};