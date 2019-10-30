const Query = require('./resolvers/Query');
const {
  GraphQLServer
} = require('graphql-yoga');
const csv = require('csv-parser');
const fs = require('fs');

console.log('reading csv files...');

console.log('loading traffic light count data...');
const trafficLightData = [];
let loggedData = false;
fs.createReadStream('./src/data/comptage-feux-2014-2018.csv')
  .pipe(csv())
  .on('data', (data) => {
    if (!loggedData) {
      console.log('Here is a sample data for traffic light count');
      console.log(data);
      loggedData = true;
    }

    const {
      Id_Reference,
      Id_Intersection,
      Nom_Intersection,
      Periode,
      Heure,
      Minute,
      Seconde,
      Code_Banque,
      Description_Code_Banque,
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
      Approche_Nord,
      Approche_Sud,
      Approche_Est,
      Approche_Ouest,
      Localisation_X,
      Localisation_Y,
      Longitude,
      Latitude
    } = data;

    trafficLightData.push({
      referenceId: parseInt(Id_Reference),
      intersectionId: parseInt(Id_Intersection),
      intersectionName: Nom_Intersection,
      date: new Date(data.Date),
      period: new Date(Periode),
      hour: parseInt(Heure),
      minute: parseInt(Minute),
      second: parseInt(Seconde),
      bankCode: parseInt(Code_Banque),
      bankCodeDescription: Description_Code_Banque,
      NBLT: parseInt(NBLT),
      NBT: parseInt(NBT),
      NBRT: parseInt(NBRT),
      NBUT: parseInt(NBUT),
      SBLT: parseInt(SBLT),
      SBT: parseInt(SBT),
      SBRT: parseInt(SBRT),
      SBUT: parseInt(SBUT),
      EBLT: parseInt(EBLT),
      EBT: parseInt(EBT),
      EBRT: parseInt(EBRT),
      EBUT: parseInt(EBUT),
      WBLT: parseInt(WBLT),
      WBT: parseInt(WBT),
      WBRT: parseInt(WBRT),
      WBUT: parseInt(WBUT),
      northApproach: parseInt(Approche_Nord),
      southApproach: parseInt(Approche_Sud),
      eastApproach: parseInt(Approche_Est),
      westApproach: parseInt(Approche_Ouest),
      xLocalisation: Localisation_X,
      yLocalisation: Localisation_Y,
      longitude: Longitude,
      latitude: Latitude
    });
  })
  .on('end', () => {
    console.log('read traffic light count data!');
    console.log(`${trafficLightData.length} entries were read`);

    console.log('starting graphQL server...');
    const resolvers = {
      Query
    };

    const server = new GraphQLServer({
      typeDefs: './src/schema.graphql',
      resolvers,
      context: request => ({
        ...request,
        trafficLightData
      })
    });

    server.start(() => console.log('Server is running on http://localhost:4000'));
  });