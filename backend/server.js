const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const db = require("./src/database/index.js");
const graphql = require("./src/graphql/schema");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS support.
app.use(cors());

// GraphQL setup
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
  })
);

// Add routes.
require("./src/routes/cart.routes.js")(express, app);
require("./src/routes/order.routes.js")(express, app);
require("./src/routes/review.routes.js")(express, app);
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/special_products.routes.js")(express, app);
require("./src/routes/follower.routes.js")(express, app);
require("./src/routes/product.routes.js")(express, app);
require("./src/routes/auth.routes.js")(express, app);

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
