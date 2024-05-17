module.exports = (express, app) => {
    const controller = require("../controllers/order.controller.js");
    const router = express.Router();
  
    // get all orders.
    router.get("/", controller.getAll);

    // Add routes to server.
    app.use("/api/order", router);
  };
