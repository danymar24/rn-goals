const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const {ApolloServer, gql} = require("apollo-server-express");

var serviceAccount = require("./serviceAccountkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "databaseUri"
});

const typeDefs = gql`
  type Goal {
    key: String
    goal: String
  }
  type Query {
    goals: [Goal]
    goal(key: String): Goal
  }
  type Mutation {
    addGoal(goal: String): Goal
    deleteGoal(key: String): Boolean
  }
`;

const resolvers = {
  Query: {
    goals: () => 
      admin
        .database()
        .ref("goals")
        .once("value")
        .then(snap => snap.val())
        .then(val => {
          const found = Object.keys(val).map(key => {
            const goal = {
              ...val[key],
              key
            }
            return goal;
          })
          return found;
        }),
    goal: (_, {key}) => 
      admin
        .database()
        .ref(`goals/${key}`)
        .once("value")
        .then(snap => snap.val())
        .then(val => {
          console.log(val);
          return val;
        })
  },
  Mutation: {
    addGoal: (_, {goal}) => 
      admin
        .database()
        .ref("goals")
        .push({
          goal
        }),
    deleteGoal: async (_, {key}) => 
      !!admin
        .database()
        .ref(`goals/${key}`)
        .remove()    
  }
}

const app = express();
const server = new ApolloServer({typeDefs, resolvers, introspection: true});
const startServer = async () => {
  await server.start();
  server.applyMiddleware({app, path: "/", cors: true});
}
startServer();
exports.graphql = functions.https.onRequest(app);
