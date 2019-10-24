const {
  Connector,
  datasets,
  tables
} = require('../dal');

const blocks = async (root, args, context, info) => {
  const connector = new Connector(datasets.blockchain, tables.blocks, args);
  const results = await connector.run();
  return results;
}

const inputs = async (root, args, context, info) => {
  const connector = new Connector(datasets.blockchain, tables.inputs);
  const results = await connector.run();
  return results;
}

const outputs = async (root, args, context, info) => {
  const connector = new Connector(datasets.blockchain, tables.outputs);
  const results = await connector.run();
  return results;
}

const transactions = async (root, args, context, info) => {
  const connector = new Connector(datasets.blockchain, tables.transactions, args);
  const results = await connector.run();
  return results;
}

const commits = async (root, args, context, info) => {
  const connector = new Connector(datasets.github, tables.commits);
  const results = await connector.run();
  return results;
}

const contents = async (root, args, context, info) => {
  const connector = new Connector(datasets.github, tables.contents);
  const results = await connector.run();
  return results;
}

const files = async (root, args, context, info) => {
  const connector = new Connector(datasets.github, tables.files);
  const results = await connector.run();
  return results;
}

const languages = async (root, args, context, info) => {
  const connector = new Connector(datasets.github, tables.languages);
  const results = await connector.run();
  return results;
}

const licenses = async (root, args, context, info) => {
  const connector = new Connector(datasets.github, tables.licenses);
  const results = await connector.run();
  return results;
}

module.exports = {
  blocks,
  inputs,
  outputs,
  transactions,
  commits,
  contents,
  files,
  languages,
  licenses
}