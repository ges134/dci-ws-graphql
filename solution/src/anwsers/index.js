const {
  request
} = require('graphql-request');

const host = 'http://localhost:4001';

const etsProportions = async () => {
  const query = `
    query {
      etsProportions {
        category
        percentage
      }
    }
  `;

  const {
    etsProportions
  } = await request(`${host}/`, query);

  const [bike] = etsProportions.filter(e => e.category === 'Vélos');
  const [car] = etsProportions.filter(e => e.category === 'Autos');
  const [pedestrians] = etsProportions.filter(e => e.category === 'Piétons');

  return `pb:${bike.percentage};pc:${car.percentage};pp:${pedestrians.percentage}`;
};

const thatsAWholeLotOfCommutes = async () => {
  const query = `
    query {
      thatsAWholeLotOfCommutes {
        intersection
      }
    }
  `;

  const {
    thatsAWholeLotOfCommutes
  } = await request(`${host}/`, query);

  return thatsAWholeLotOfCommutes[0].intersection;
};

const whereDoPedestriansGo = async () => {
  const query = `
    query {
      whereDoPedestriansGo {
        direction
        numberOfPedestrians
      }
    }
  `;

  const {
    whereDoPedestriansGo
  } = await request(`${host}/`, query);

  const [most, second] = whereDoPedestriansGo;

  return `d:${most.direction}-e:${most.numberOfPedestrians - second.numberOfPedestrians}`;
};

const trucksAndMoreTrucks = async () => {
  const query = `
    query {
      trucksAndMoreTrucks {
        category
        percentage
      }
    }`;

  const {
    trucksAndMoreTrucks
  } = await request(`${host}/`, query);

  const [lightWeight] = trucksAndMoreTrucks.filter(e => e.category === 'Camions légers');
  const [heavyWeight] = trucksAndMoreTrucks.filter(e => e.category === 'Camions lourds');
  const [truck] = trucksAndMoreTrucks.filter(e => e.category === 'Camions');
  const [carryingTruck] = trucksAndMoreTrucks.filter(e => e.category === 'Camions porteurs');
  const [articulatedTruck] = trucksAndMoreTrucks.filter(e => e.category === 'Camions articules');

  return `cle:${lightWeight.percentage}-clo:${heavyWeight.percentage}-c:${truck.percentage}-cp:${carryingTruck.percentage}-ca:${articulatedTruck.percentage}`;
};

const highSteaks = async () => {
  const query = `
    query {
      highSteaks {
        establishment
      }
    }
  `;

  const {
    highSteaks
  } = await request(`${host}/`, query);

  return highSteaks[0].establishment;
};

const aLotOfFines = async () => {
  const query = `
    query {
      aLotOfFines {
        averageAmount
      }
    }
  `;

  const {
    aLotOfFines
  } = await request(`${host}/`, query);

  return aLotOfFines[0].averageAmount;
};

const howLongBeforeTheJudgment = async () => {
  const query = `
    query {
      howLongBeforeTheJudgment {
        averageWaitingTime
        entries {
          differenceWithAverage
        }
      }
    }
  `;

  const {
    howLongBeforeTheJudgment
  } = await request(`${host}/`, query);

  const {
    entries,
    averageWaitingTime
  } = howLongBeforeTheJudgment;

  const [max] = entries;
  const min = entries[entries.length - 1];

  return `moy:${averageWaitingTime}-max:${max.differenceWithAverage}-min:${min.differenceWithAverage}`;
};

const breakdownOfCrimes = async () => {
  const query = `
    query {
      breakdownOfCrimes {
        crime
      }
    }
  `;

  const {
    breakdownOfCrimes
  } = await request(`${host}/`, query);

  const [y2015, y2016, y2017, y2018, y2019] = breakdownOfCrimes;

  return `2015.${y2015.crime}-2016.${y2016.crime}-2017.${y2017.crime}-2018.${y2018.crime}-2019.${y2019.crime}`;
};

const whenDoTheyHappen = async () => {
  const query = `
  query {
    whenDoTheyHappen {
      year
      difference
      most {
        shift
      }
      less {
        shift
      }
    }
  }
`;

  const {
    whenDoTheyHappen
  } = await request(`${host}/`, query);

  return whenDoTheyHappen.map(y => `${y.year}.${y.most.shift};${y.less.shift};${y.difference}`).join('-');
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