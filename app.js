const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDef");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");

const server = new ApolloServer({ typeDefs, resolvers });
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("Connected to the DB!");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at: ${res.url}`);
  });
