import { Meteor } from 'meteor/meteor';
import { apolloServer } from 'graphql-tools';
import express from 'express';
import proxyMiddleware from 'http-proxy-middleware';

import { schema, resolvers } from '/imports/api/schema';

//Set default graphql port to 4000
const GRAPHQL_PORT = 4000;

//Create an express server
const graphQLServer = express();

//Provide graphql endpoint to express server
graphQLServer.use('/graphql', apolloServer(async (req) => {
  return {
    graphiql: true, //Enable graphiql interface for GraphQL discovery
    pretty: true, //Pretty print response (not recommended for production use)
    schema,
    resolvers,
    context: {}
  };
}));

//Start the grapql express server
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

//Proxy graphql throught meteor app on the same host but on GRAPHQL_PORT (default to 4000)
WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`));
