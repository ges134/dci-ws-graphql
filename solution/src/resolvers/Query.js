const {
  request
} = require('graphql-request');

const host = process.env.API_HOST || 'http://localhost:4000';

const etsProportions = async () => {
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

  const totals = [{
    category: 'Autos',
    total: 0,
  }, {
    category: 'Camions légers',
    total: 0,
  }, {
    category: 'Camions lourds',
    total: 0,
  }, {
    category: 'Piétons',
    total: 0,
  }, {
    category: 'Vélos',
    total: 0,
  }, {
    category: 'Bus',
    total: 0,
  }, {
    category: 'Ecolier',
    total: 0,
  }, {
    category: 'Camions',
    total: 0,
  }, {
    category: 'Camions porteurs',
    total: 0,
  }, {
    category: 'Camions articules',
    total: 0,
  }, {
    category: 'Motos',
    total: 0,
  }, {
    category: 'Non Utilisé',
    total: 0,
  }, {
    category: 'Uturn',
    total: 0,
  }, {
    category: 'Illégaux',
    total: 0,
  }, {
    category: 'Autres',
    total: 0,
  }, {
    category: 'Tous',
    total: 0,
  }];

  const bankCodes = [0, 1, 2, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 40, 100];

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

    totals[bankCodes.indexOf(bankCode)].total += total;
  }

  let sum = 0;
  totals.forEach(e => {
    console.log(e);
    sum += e.total;
  });

  return totals.map(e => ({
    category: e.category,
    percentage: Math.round((e.total / sum) * 100)
  }));
};

// TODO: this challenges doesn't collide with anwsers. Remove anwsers.
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

  const intersectionBreakdown = count.map((e, i) => ({
    intersection: intersections[i],
    numberOfCommuters: e
  }));

  return intersectionBreakdown.sort((a, b) => a.numberOfCommuters - b.numberOfCommuters).reverse();
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

  return [{
    direction: 'nord',
    numberOfPedestrians: north
  }, {
    direction: 'south',
    numberOfPedestrians: south
  }, {
    direction: 'west',
    numberOfPedestrians: west
  }, {
    direction: 'east',
    numberOfPedestrians: east
  }];
};

// We shouldn't be using async/await in forEach callback since it's not aware. 
// https://zellwk.com/blog/async-await-in-loops/
const trucksAndMoreTrucks = async () => {
  const codes = [1, 2, 14, 15, 16];
  const categories = ['Camions légers', 'Camions lourds', 'Camions', 'Camions porteurs', 'Camions articules'];
  const totals = [];
  let total = 0;

  for (let i = 0; i < codes.length; i++) {
    const query = `
      query {
        trafficLightCount(bankCode: ${codes[i]}) {
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

    const {
      trafficLightCount
    } = await request(`${host}/`, query);

    let sum = 0;

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

    totals.push(sum);
    total += sum;
  }

  return categories.map((e, i) => ({
    category: e,
    percentage: Math.round(totals[i] / total * 100)
  }));
};

// TODO: the awnser provided in anwsers folder is incorrect. Correct this.
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



  return establishments.map((e, i) => ({
    establishment: e,
    totalFine: amounts[i]
  })).sort((a, b) => a.totalFine - b.totalFine).reverse();
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

  const sorted = foodInspectionOffenders.sort((a, b) => a.violationDate - b.violationDate);

  const fines = [];

  sorted.forEach(value => {
    const filtered = fines.filter(e => e.day === value.violationDate);
    if (filtered.length) {
      const current = fines[fines.indexOf(filtered[0])];
      current.amounts.push(value.amount);
    } else {
      fines.push({
        day: value.violationDate,
        averageAmount: 0,
        amounts: [value.amount],
      });
    }
  });

  fines.forEach(value => {
    let sum = 0;
    value.amounts.forEach(amount => {
      sum += amount;
    });
    value.averageAmount = Math.round(sum / value.amounts.length);
  });

  return fines.sort((a, b) => a.amounts.length - b.amounts.length).reverse();
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

  let differences = foodInspectionOffenders
    .map(element => Math.ceil((new Date(element.judgementDate) - new Date(element.violationDate)) / (1000 * 60 * 60 * 24)))
    .sort((a, b) => a - b)
    .reverse();

  let sum = 0;
  differences.forEach(value => {
    sum += value;
  });

  const average = Math.round(sum / differences.length);
  return {
    averageWaitingTime: average,
    entries: differences.map(e => ({
      waitingTime: e,
      differenceWithAverage: Math.abs(e - average)
    }))
  };
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

  return [{
      year: 2015,
      crime: highest2015,
    },
    {
      year: 2016,
      crime: highest2016,
    },
    {
      year: 2017,
      crime: highest2017,
    },
    {
      year: 2018,
      crime: highest2018,
    },
    {
      year: 2019,
      crime: highest2019,
    },
  ];
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

  return years.map((e, i) => {
    const dayShift = {
      shift: 'jour',
      numberOfCrimes: day[i],
    };

    const eveningShift = {
      shift: 'soir',
      numberOfCrimes: evening[i],
    };

    const nightShift = {
      shift: 'nuit',
      numberOfCrimes: night[i],
    };

    const SortedShifts = [dayShift, eveningShift, nightShift].sort((a, b) => a.numberOfCrimes - b.numberOfCrimes);

    // eslint-disable-next-line no-unused-vars
    const [min, mid, max] = SortedShifts;

    return {
      most: max,
      less: min,
      difference: max.numberOfCrimes - min.numberOfCrimes,
      year: e
    };

  });
};

module.exports = {
  etsProportions,
  thatsAWholeLotOfCommutes,
  whereDoPedestriansGo,
  trucksAndMoreTrucks,
  highSteaks,
  aLotOfFines,
  breakdownOfCrimes,
  whenDoTheyHappen,
  howLongBeforeTheJudgment
};