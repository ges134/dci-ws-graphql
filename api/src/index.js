const Query = require('./resolvers/Query');
const {
  GraphQLServer
} = require('graphql-yoga');

const resolvers = {
  Query
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server is running on http://localhost:4000'));