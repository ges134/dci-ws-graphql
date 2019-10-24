const {
  BigQuery
} = require('@google-cloud/bigquery');

const blockchains = [
  'crypto_bitcoin',
  'crypto_dogecoin',
  'crypto_litecoin',
];

const datasets = {
  github: 'github_repos',
  blockchain: 'blockchain',
};

const tables = {
  blocks: 'blocks',
  inputs: 'inputs',
  outputs: 'outputs',
  transactions: 'transactions',
  commits: 'commits',
  contents: 'contents',
  files: 'files',
  languages: 'languages',
  licenses: 'licenses'
};

class Connector {
  constructor(dataset, table, args) {
    this.queries = [];
    this.client = new BigQuery();

    const limit = args ? `limit ${args.top.toString()}` : '';
    const order = args.orderCol || '';

    if (dataset === datasets.blockchain) {
      for (let i = 0; i < blockchains.length; i++) {
        this.queries.push(`select * from \`bigquery-public-data.${blockchains[i]}.${table}\` ${limit}`);
      }
    } else {
      this.queries.push(`select * from \`bigquery-public-data.${dataset}.${table}\` ${limit}`);
    }
  }

  async run() {
    const all = [];

    for (let i = 0; i < this.queries.length; i++) {
      let results = await this.execute(this.queries[i]);
      if (this.queries.includes('crypto')) {
        results = results.map(r => {
          return {
            ...r,
            currency: blockchains[i]
          };
        });
      }

      all.push(...results);
    }

    return all;
  }

  async execute(query) {
    const options = {
      query,
      location: 'US'
    };

    console.log(query);

    const [rows] = await this.client.query(options);

    return rows;
  }
}

module.exports = {
  Connector,
  datasets,
  tables
};