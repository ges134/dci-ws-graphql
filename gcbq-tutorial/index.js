const {
  BigQuery
} = require('@google-cloud/bigquery');


const queryShakespeare = async () => {
  const bigqueryClient = new BigQuery();

  const sql = `SELECT word, word_count
    FROM \`bigquery-public-data.samples.shakespeare\`
    WHERE corpus = @corpus
    AND word_count >= @min_word_count
    ORDER BY word_count DESC`;

  const options = {
    query: sql,
    location: 'US',
    params: {
      corpus: 'romeoandjuliet',
      min_word_count: 250
    },
    useQueryCache: false,
  };

  const [job] = await bigqueryClient.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults()

  console.log('rows:');
  rows.forEach(row => console.log(row));

  console.log('JOB STATISTICS:')
  console.log(`Status: ${job.metadata.status.state}`);
  console.log(`Creation time: ${job.metadata.statistics.creationTime}`);
  console.log(`Start time: ${job.metadata.statistics.startTime}`);
  console.log(`Statement type: ${job.metadata.statistics.query.statementType}`);
}

const queryGitHub = async () => {
  const client = new BigQuery();

  const query = `SELECT subject AS subject, COUNT(*) AS num_duplicates
        FROM \`bigquery-public-data.github_repos.commits\`
        GROUP BY subject 
        ORDER BY num_duplicates 
        DESC LIMIT 10`;

  const options = {
    query,
    location: 'US'
  }

  const [rows] = await client.query(options);

  console.log('Rows:');
  rows.forEach(row => console.log(`${row.subject}: ${row.num_duplicates}`))
}

queryShakespeare()
// queryGitHub()