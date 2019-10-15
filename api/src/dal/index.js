import {
  BigQuery
} from '@google-cloud/bigquery';
const {
  BigQuery
} = require('@google-cloud/bigquery');

const template = 'select * from \`bigquery-public-data.'

class Connector {
  constructor(table, dataset) {
    this.dataset = dataset;
    this.table = table;
    this.query = `${template}${dataset}.${table}`;
    this.client = new BigQuery();
  }

  run = async () => {
    if (this.dataset === dataset.blockchain) {
      const results = [];
      for (let i = 0; i < blockchains.length; i++) {
        const results = await this.execute(`${template}${blockchains[i]}.${this.table}`);
        results.push(...results);
        return results;
      }

      return this.execute(this.query);
    }
  }

  execute = async query => {
    const options = {
      query,
      location: 'US'
    };

    const [rows] = await this.client.query(options)

    return rows;
  }
}

const blockchains = [
  'crypto_bitcoin',
  'crypto_dogecoin',
  'crypto_litecoin',
]

const datasets = {
  github: 'github_repos',
  blockchain: 'blockchain',
}

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
}

module.exports = {
  Connector,
  datasets,
  tables
};