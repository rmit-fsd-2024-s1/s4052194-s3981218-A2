module.exports = (express, app) => {
    const controller = require("../controllers/order.controller.js");
    const router = express.Router();
  
    // get all orders.
    router.get("/", controller.getAll);
    // get order by user id
    router.get("/user/:id", controller.getOrderByUserId);
    //create an order
    router.post("/", controller.create);
    //delete all by user id
    router.delete("/",controller.deleteItemByUserId);
    // Add routes to server.
    app.use("/api/order", router);
  };
