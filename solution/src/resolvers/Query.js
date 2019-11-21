const {
  etsProportionsQuery,
  thatsAWholeLotOfCommutesQuery,
  whereDoPedestriansGoQuery,
  trucksAndMoreTrucksQuery,
  highSteaksQuery,
  alotOfFinesQuery,
  howLongBeforeTheJudgementQuery,
  breakdownOfCrimesQuery,
  whenDoTheyHappenQuery
} = require('./requests');
const {
  callAPI,
  allCountsForEntry,
  filterYear,
  sum,
  avg
} = require('./helpers');

const etsProportions = async () => {
  const {
    trafficLightCount
  } = await callAPI(etsProportionsQuery);

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
      bankCode
    } = result[i];

    const total = allCountsForEntry(result[i]);

    totals[bankCodes.indexOf(bankCode)].total += total;
  }

  let sumOfElements = sum(...totals.map(e => e.total));

  return totals.map(e => ({
    category: e.category,
    percentage: Math.round((e.total / sumOfElements) * 100)
  }));
};

const thatsAWholeLotOfCommutes = async () => {
  const {
    trafficLightCount
  } = await callAPI(thatsAWholeLotOfCommutesQuery);

  const intersections = [];
  const count = [];

  trafficLightCount.forEach(value => {
    const {
      intersectionName
    } = value;

    const total = allCountsForEntry(value);

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
  const {
    trafficLightCount
  } = await callAPI(whereDoPedestriansGoQuery);

  const {
    northApproach,
    southApproach,
    westApproach,
    eastApproach
  } = trafficLightCount.reduce((a, b) => ({
    northApproach: a.northApproach + b.northApproach,
    southApproach: a.southApproach + b.southApproach,
    westApproach: a.westApproach + b.westApproach,
    eastApproach: a.eastApproach + b.eastApproach,
  }));

  return [{
    direction: 'nord',
    numberOfPedestrians: northApproach
  }, {
    direction: 'south',
    numberOfPedestrians: southApproach
  }, {
    direction: 'west',
    numberOfPedestrians: westApproach
  }, {
    direction: 'east',
    numberOfPedestrians: eastApproach
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
    const {
      trafficLightCount
    } = await callAPI(trucksAndMoreTrucksQuery(codes[i]));

    let sumOfElements = sum(trafficLightCount.map(e => allCountsForEntry(e)));
    totals.push(sumOfElements);
    total += sumOfElements;
  }

  return categories.map((e, i) => ({
    category: e,
    percentage: Math.round(totals[i] / total * 100)
  }));
};

const highSteaks = async () => {
  const {
    foodInspectionOffenders
  } = await callAPI(highSteaksQuery);

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
  const {
    foodInspectionOffenders
  } = await callAPI(alotOfFinesQuery);

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
    value.averageAmount = avg(...value.amounts);
  });

  return fines.sort((a, b) => a.amounts.length - b.amounts.length).reverse();
};

const howLongBeforeTheJudgment = async () => {
  const {
    foodInspectionOffenders
  } = await callAPI(howLongBeforeTheJudgementQuery);

  let differences = foodInspectionOffenders
    .map(element => Math.ceil((new Date(element.judgementDate) - new Date(element.violationDate)) / (1000 * 60 * 60 * 24)))
    .sort((a, b) => a - b)
    .reverse();

  const average = avg(...differences);

  return {
    averageWaitingTime: average,
    entries: differences.map(e => ({
      waitingTime: e,
      differenceWithAverage: Math.abs(e - average)
    }))
  };
};

const breakdownOfCrimes = async () => {
  const {
    policeIntervention
  } = await callAPI(breakdownOfCrimesQuery);

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

  const breakdown = [];

  for (let i = 2015; i <= 2019; i++) {
    const highest = highestForYear(
      filterYear(policeIntervention, i),
      usedCategories
    );
    usedCategories.push(highest);
    breakdown.push({
      year: i,
      crime: highest,
    });
  }

  return breakdown;
};

const whenDoTheyHappen = async () => {
  const {
    policeIntervention
  } = await callAPI(whenDoTheyHappenQuery);

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