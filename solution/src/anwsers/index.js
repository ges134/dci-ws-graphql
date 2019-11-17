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
      totalBike += northApproach + southApproach + eastApproach + westApproach;
    } else {
      totalOther +=
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
        WBUT +
        northApproach +
        southApproach +
        eastApproach +
        westApproach;
    }
  }

  const total = totalBike + totalCar + totalPedestrian + totalOther;

  const percentageBike = Math.round((totalBike / total) * 100);
  const percentageCar = Math.round((totalCar / total) * 100);
  const percentagePedestrian = Math.round((totalPedestrian / total) * 100);

  console.log(
    `pb:${percentageBike};pc:${percentageCar};pp:${percentagePedestrian}`
  );
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

    const total =
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
};

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
  console.log(`d:${direction}-e:${difference}`);
};

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
    `;

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

      sum +=
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
    const percentages = [
      Math.round((cle / total) * 100),
      Math.round((clo / total) * 100),
      Math.round((c / total) * 100),
      Math.round((cp / total) * 100),
      Math.round((ca / total) * 100)
    ];

    console.log(cle);
    console.log(clo);
    console.log(c);
    console.log(cp);
    console.log(ca);

    console.log(
      `cle:${percentages[0]}-clo:${percentages[1]}-c:${percentages[2]}-cp:${
        percentages[3]
      }-ca:${percentages[4]}`
    );
  });
};

const highSteaks = async () => {
  const query = `
    query {
      foodInspectionOffenders {
        establishment
        amount
      }
    }
  `;

  const {
    foodInspectionOffenders
  } = await request(`${host}/`, query);

  const establishments = [];
  const amounts = [];

  foodInspectionOffenders.forEach(value => {
    const {
      establishment,
      amount
    } = value;

    if (establishments.includes(establishment)) {
      amounts[establishments.indexOf(establishment)] += amount;
    } else {
      establishments.push(establishment);
      amounts.push(amount);
    }
  });

  const highestFined =
    establishments[amounts.indexOf(amounts.sort((a, b) => a - b).reverse()[0])];

  console.log(highestFined);
};

const aLotOfFines = async () => {
  const query = `
    query {
      foodInspectionOffenders {
        violationDate
        amount
      }
    }
  `;

  const {
    foodInspectionOffenders
  } = await request(`${host}/`, query);

  const dates = [];
  const counts = [];

  foodInspectionOffenders.forEach(value => {
    const {
      violationDate
    } = value;

    console.log(violationDate);

    if (dates.includes(violationDate)) {
      counts[dates.indexOf(violationDate)] += 1;
    } else {
      dates.push(violationDate);
      counts.push(1);
    }
  });

  const dateWithMostInfractions =
    dates[counts.indexOf(counts.sort((a, b) => a - b).reverse()[0])];

  const amountsOfMostInfractions = foodInspectionOffenders
    .filter(value => value.violationDate === dateWithMostInfractions)
    .map(value => value.amount);

  let total = 0;

  amountsOfMostInfractions.forEach(amount => {
    total += amount;
  });

  const average = Math.round(total / amountsOfMostInfractions.length);

  console.log(average);
};

const howLongBeforeTheJudgment = async () => {
  const query = `
    query {
      foodInspectionOffenders {
        violationDate
        judgementDate
      }
    }
  `;

  const {
    foodInspectionOffenders
  } = await request(`${host}/`, query);

  const differences = foodInspectionOffenders.map(element => Math.ceil((new Date(element.judgementDate) - new Date(element.violationDate)) / (1000 * 60 * 60 * 24)));

  let sum = 0;
  differences.forEach(value => {
    sum += value;
  });

  const average = Math.round(sum / differences.length);
  const max = Math.max(...differences) - average;
  const min = average - Math.min(...differences);

  console.log(`moy:${average}-max:${max}-min:${min}`);
};


const filterYear = (crimes, year) =>
  crimes.filter(value => new Date(value.date).getFullYear() === year);

const breakdownOfCrimes = async () => {
  const query = `
    query {
      policeIntervention {
        category
        date
      }
    }
  `;

  const {
    policeIntervention
  } = await request(`${host}/`, query);

  const usedCategories = [];

  const highestForYear = (crimesForYear, usedCategories) => {
    const categories = [
      'Introduction',
      'Vol dans / sur véhicule à moteur',
      'Vol de véhicule à moteur',
      'Méfait',
      'Vol qualifié',
      'Infraction entraînant la mort'
    ];
    const counts = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < categories.length; i++) {
      counts[i] = crimesForYear.filter(
        element => element.category === categories[i]
      ).length;
    }

    const sortedCounts = counts.sort((a, b) => a - b).reverse();
    let category = '';
    let i = 0;

    while (!category) {
      const candidate = categories[counts.indexOf(sortedCounts[i])];
      if (usedCategories.includes(candidate)) {
        i++;
      } else {
        category = candidate;
      }
    }

    return category;
  };

  const highest2015 = highestForYear(
    filterYear(policeIntervention, 2015),
    usedCategories
  );
  usedCategories.push(highest2015);

  const highest2016 = highestForYear(
    filterYear(policeIntervention, 2016),
    usedCategories
  );
  usedCategories.push(highest2016);

  const highest2017 = highestForYear(
    filterYear(policeIntervention, 2017),
    usedCategories
  );
  usedCategories.push(highest2017);

  const highest2018 = highestForYear(
    filterYear(policeIntervention, 2018),
    usedCategories
  );
  usedCategories.push(highest2018);

  const highest2019 = highestForYear(
    filterYear(policeIntervention, 2019),
    usedCategories
  );
  usedCategories.push(highest2019);

  console.log(
    `2015.${highest2015}-2016.${highest2016}-2017.${highest2017}-2018.${highest2018}-2019.${highest2019}`
  );
};

const whenDoTheyHappen = async () => {
  const query = `
  query {
    policeIntervention {
      date
      shift
    }
  }
`;

  const {
    policeIntervention
  } = await request(`${host}/`, query);

  const years = [2015, 2016, 2017, 2018, 2019];
  const day = [0, 0, 0, 0, 0];
  const evening = [0, 0, 0, 0, 0];
  const night = [0, 0, 0, 0, 0];

  for (let i = 0; i < years.length; i++) {
    const current = filterYear(policeIntervention, years[i]);

    day[i] = current.filter(value => value.shift === 'jour').length;
    evening[i] = current.filter(value => value.shift === 'soir').length;
    night[i] = current.filter(value => value.shift === 'nuit').length;
  }

  let stats = [];

  for (let i = 0; i < years.length; i++) {
    const max = Math.max(day[i], evening[i], night[i]);
    const min = Math.min(day[i], evening[i], night[i]);

    const shiftMax = max === day[i] ? 'jour' : max === evening[i] ? 'soir' : 'nuit';
    const shiftMin = min === day[i] ? 'jour' : min === evening[i] ? 'soir' : 'nuit';

    stats.push(`${years[i]}.${shiftMax};${shiftMin};${max-min}`);
  }

  console.log(stats.join('-'));
};

module.exports = {
  trafficLightCount,
  thatsAWholeLotOfCommutes,
  whereDoPedestriansGo,
  trucksAndMoreTrucks,
  highSteaks,
  aLotOfFines,
  breakdownOfCrimes,
  whenDoTheyHappen,
  howLongBeforeTheJudgment
};