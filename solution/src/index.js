console.log('getting environment variables...');
require('dotenv').config();
console.log('environment variable collection complete!');

console.log('fetching dependencies...');
const {
  GraphQLServer
} = require('graphql-yoga');
const Query = require('./resolvers/Query');
console.log('dependency setup complete!');

console.log('setting GraphQL server...');
const resolvers = {
  Query,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start({
  port: 4001
}, () => console.log('server is running on http://ocalhost:4001'));