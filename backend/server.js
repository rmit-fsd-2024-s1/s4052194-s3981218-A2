//apollo serve express
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const cors = require("cors");

//subscription
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// GraphQL schema and resolvers.
const { typeDefs, resolvers } = require("./src/graphql/index.js");

// Database will be sync'ed in the background.
const db = require("./src/database");
db.sync();

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Setup Apollo server.
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  
  await server.start();
  server.applyMiddleware({ app });

  // Add other Express middleware here, if needed
  app.use(express.json());
  app.use(cors());


  require("./src/routes/cart.routes.js")(express, app);
  require("./src/routes/order.routes.js")(express, app);
  require("./src/routes/review.routes.js")(express, app);
  require("./src/routes/user.routes.js")(express, app);
  require("./src/routes/special_products.routes.js")(express, app);
  require("./src/routes/follower.routes.js")(express, app);
  require("./src/routes/product.routes.js")(express, app);
  require("./src/routes/auth.routes.js")(express, app);

  const PORT = 4000;
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
