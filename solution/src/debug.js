require('dotenv').config();
const {
  etsProportions,
  thatsAWholeLotOfCommutes,
  whereDoPedestriansGo,
  trucksAndMoreTrucks,
  highSteaks,
  aLotOfFines,
  breakdownOfCrimes,
  whenDoTheyHappen,
  howLongBeforeTheJudgment
} = require('./anwsers');

console.log('Setting up challenges anwsers...');
console.log('flags will be printed after all challenges have been resolved');

const resolveAll = async () => {
  const flags = [];
  console.log('resolving etsProportions challenge...');
  const etsProportionsFlag = await etsProportions();
  flags.push({
    challenge: 'etsProportions',
    flag: etsProportionsFlag
  });
  console.log('etsProportions resolved');

  console.log('resolving thatsAWholeLotOfCommutes challenge...');
  const thatsAWholeLotOfCommutesFlag = await thatsAWholeLotOfCommutes();
  flags.push({
    challenge: 'thatsAWholeLotOfCommutes',
    flag: thatsAWholeLotOfCommutesFlag
  });
  console.log('thatsAWholeLotOfCommutes resolved');

  console.log('resolving whereDoPedestriansGo challenge...');
  const whereDoPedestriansGoFlag = await whereDoPedestriansGo();
  flags.push({
    challenge: 'whereDoPedestriansGo',
    flag: whereDoPedestriansGoFlag
  });
  console.log('whereDoPedestriansGo resolved');

  console.log('resolving trucksAndMoreTrucks challenge...');
  const trucksAndMoreTrucksFlag = await trucksAndMoreTrucks();
  flags.push({
    challenge: 'trucksAndMoreTrucks',
    flag: trucksAndMoreTrucksFlag
  });
  console.log('trucksAndMoreTrucks resolved');

  console.log('resolving highSteaks challenge...');
  const highSteaksFlag = await highSteaks();
  flags.push({
    challenge: 'highSteaks',
    flag: highSteaksFlag
  });
  console.log('highSteaks resolved');

  console.log('resolving aLotOfFines challenge...');
  const aLotOfFinesFlag = await aLotOfFines();
  flags.push({
    challenge: 'aLotOfFines',
    flag: aLotOfFinesFlag
  });
  console.log('aLotOfFines resolved');

  console.log('resolving breakdownOfCrimes challenge...');
  const breakdownOfCrimesFlag = await breakdownOfCrimes();
  flags.push({
    challenge: 'breakdownOfCrimes',
    flag: breakdownOfCrimesFlag
  });
  console.log('breakdownOfCrimes resolved');

  console.log('resolving whenDoTheyHappen challenge...');
  const whenDoTheyHappenFlag = await whenDoTheyHappen();
  flags.push({
    challenge: 'whenDoTheyHappen',
    flag: whenDoTheyHappenFlag
  });
  console.log('whenDoTheyHappen resolved');

  console.log('resolving howLongBeforeTheJudgment challenge...');
  const howLongBeforeTheJudgmentFlag = await howLongBeforeTheJudgment();
  flags.push({
    challenge: 'howLongBeforeTheJudgment',
    flag: howLongBeforeTheJudgmentFlag
  });
  console.log('howLongBeforeTheJudgment resolved');

  flags.push({
    challenge: 'ImpressMe1',
    flag: 'Flag-O0O0ONNYG0D',
  }, {
    challenge: 'ImpressMe2',
    flag: 'Flag-IC@nn077h1nk@b0u77h15',
  }, {
    challenge: 'ImpressMe3',
    flag: 'Flag-0mglul7h@7151n5@n3',
  });

  return flags;
};

resolveAll().then(flags => {
  console.log('all challenges are resolved');
  console.log('printing flags...');

  flags.forEach(f => {
    console.log(`${f.challenge} --- ${f.flag}`);
  });
});