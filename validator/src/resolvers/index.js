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

const thatsAWholeLotOfCommutes = async () => {
  const query = `
    query {
      trafficLightCount(beginHour: 5, endHour: 9) {
        intersectionName
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

  const intersections = [];
  const count = [];

  trafficLightCount.forEach(value => {
    const {
      intersectionName,
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
    } = value;

    const total = NBLT +
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

    if (intersections.includes(intersectionName)) {
      const idx = intersections.indexOf(intersectionName);
      count[idx] += total;
    } else {
      intersections.push(intersectionName);
      count.push(total);
    }
  });
  const sortedCount = count.sort((a, b) => a - b).reverse();

  const idx = count.indexOf(sortedCount[0]);
  console.log(intersections[idx]);
  console.log(count[idx]);
}

const whereDoPedestriansGo = async () => {
  const query = `
    query {
      trafficLightCount(bankCode: 10) {
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

  let north = 0,
    south = 0,
    west = 0,
    east = 0;

  trafficLightCount.forEach(e => {
    north += e.northApproach;
    south += e.southApproach;
    west += e.westApproach;
    east += e.eastApproach;
  });

  const ranking = [north, south, west, east].sort((a, b) => a - b).reverse();
  const difference = ranking[0] + ranking[1];

  let direction = '';
  if (ranking[0] === north) {
    direction = 'nord';
  } else if (ranking[0] === south) {
    direction = 'sud';
  } else if (ranking[0] === west) {
    direction = 'ouest';
  } else if (ranking[0] === east) {
    direction = 'est';
  }

  console.log(north);
  console.log(east);
  console.log(south);
  console.log(west);
  console.log(`d:${direction}-e:${difference}`)
}

const trucksAndMoreTrucks = async () => {
  const codes = [1, 2, 14, 15, 16];

  let cle = 0,
    clo = 0,
    c = 0,
    cp = 0,
    ca = 0;

  codes.forEach(async code => {
    const query = `
      query {
        trafficLightCount(bankCode: ${code}) {
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
        }
      }
    `

    let sum = 0;

    const {
      trafficLightCount
    } = await request(`${host}/`, query);

    trafficLightCount.forEach(e => {
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
        WBUT
      } = e;

      sum += NBLT +
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
        WBUT
    });

    switch (code) {
      case 1:
        cle += sum;
        break;
      case 2:
        clo += sum;
        break;
      case 14:
        c += sum;
        break;
      case 15:
        cp += sum;
        break;
      case 16:
        ca += sum;
        break;
    }

    const total = cle + clo + c + cp + ca;
    const percentages = [Math.round(cle / total * 100), Math.round(clo / total * 100), Math.round(c / total * 100), Math.round(cp / total * 100), Math.round(ca / total * 100)];

    console.log(cle);
    console.log(clo);
    console.log(c);
    console.log(cp);
    console.log(ca);

    console.log(`cle:${percentages[0]}-clo:${percentages[1]}-c:${percentages[2]}-cp:${percentages[3]}-ca:${percentages[4]}`);
  });
}

module.exports = {
  trafficLightCount,
  thatsAWholeLotOfCommutes,
  whereDoPedestriansGo,
  trucksAndMoreTrucks
};