const etsProportionsQuery = `
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

const thatsAWholeLotOfCommutesQuery = `
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

const whereDoPedestriansGoQuery = `
  query {
    trafficLightCount(bankCode: 10) {
      northApproach
      southApproach
      eastApproach
      westApproach
    }
  }
`;

const trucksAndMoreTrucksQuery = code => `
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

const highSteaksQuery = `
  query {
    foodInspectionOffenders {
      establishment
      amount
    }
  }
`;

const alotOfFinesQuery = `
  query {
    foodInspectionOffenders {
      violationDate
      amount
    }
  }
`;

const howLongBeforeTheJudgementQuery = `
  query {
    foodInspectionOffenders {
      violationDate
      judgementDate
    }
  }
`;

const breakdownOfCrimesQuery = `
  query {
    policeIntervention {
      category
      date
    }
  }
`;

const whenDoTheyHappenQuery = `
  query {
    policeIntervention {
      date
      shift
    }
  }
`;

module.exports = {
  etsProportionsQuery,
  thatsAWholeLotOfCommutesQuery,
  whereDoPedestriansGoQuery,
  trucksAndMoreTrucksQuery,
  highSteaksQuery,
  alotOfFinesQuery,
  howLongBeforeTheJudgementQuery,
  breakdownOfCrimesQuery,
  whenDoTheyHappenQuery
};