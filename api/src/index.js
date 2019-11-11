const Query = require('./resolvers/Query');
const {
  parseAmount
} = require('./helpers');

const {
  GraphQLServer
} = require('graphql-yoga');
const csv = require('csv-parser');
const fs = require('fs');
const moment = require('moment');

console.log('setting dependencies...');
moment.locale('fr-ca');
console.log(moment.locale());

console.log('dependencies set!');

console.log('reading csv files...');

console.log('loading traffic light count data...');
const trafficLightData = [];
fs.createReadStream('./src/data/comptage-feux-2014-2018.csv')
  .pipe(csv())
  .on('data', data => {
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

    console.log('reading into food inspection offenders...');
    const foodInspectionOffenders = [];

    fs.createReadStream('./src/data/inspection-aliments-contrevenants.csv')
      .pipe(
        csv({
          separator: ';'
        })
      )
      .on('data', data => {
        foodInspectionOffenders.push({
          address: data['/contrevenant/addresse'],
          category: data['/contrevenant/categorie'],
          violationDate: moment(
            data['/contrevenant/date_infraction'],
            'DD MMMM YYYY'
          ).toDate(),
          judgementDate: moment(
            data['/contrevenant/date_jugement'],
            'DD MMMM YYYY'
          ).toDate(),
          description: data['/contrevenant/description'],
          establishment: data['/contrevenant/etablissement'],
          amount: parseAmount(data['/contrevenant/montant']),
          owner: data['/contrevenant/proprietaire'],
          city: data['/contrevenant/ville']
        });
      })
      .on('end', () => {
        console.log('read food inspection offenders data data!');
        console.log(`${foodInspectionOffenders.length} entries were read`);

        console.log('reading police interventions...');
        const policeIntervention = [];

        fs.createReadStream('./src/data/interventionscitoyendo.csv')
          .pipe(csv())
          .on('data', data => {
            const {
              CATEGORIE,
              DATE,
              QUART,
              PDQ,
              X,
              Y,
              LONGITUDE,
              LATITUDE
            } = data;

            policeIntervention.push({
              category: CATEGORIE,
              date: moment(DATE, 'YYYY-MM-DD').toDate(),
              shift: QUART,
              station: parseInt(PDQ),
              x: parseFloat(X),
              y: parseFloat(Y),
              longitude: parseFloat(LONGITUDE),
              latitude: parseFloat(LATITUDE)
            });
          }).on('end', () => {
            console.log(policeIntervention[0]);
            console.log('read all csv files!');

            console.log('starting graphQL server...');
            const resolvers = {
              Query
            };

            const server = new GraphQLServer({
              typeDefs: './src/schema.graphql',
              resolvers,
              context: request => ({
                ...request,
                trafficLightData,
                foodInspectionOffenders,
                policeIntervention
              })
            });

            server.start(() =>
              console.log('Server is running on http://localhost:4000')
            );
          });
      });
  });