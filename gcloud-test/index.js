const {
  BigQuery
} = require('@google-cloud/bigquery');

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)

async function createDataset() {
  // Creates a client
  const bigqueryClient = new BigQuery();

  // Create the dataset
  const [dataset] = await bigqueryClient.createDataset('aset');
  console.log(`Dataset ${dataset.id} created.`);
}
createDataset();