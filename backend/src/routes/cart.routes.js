module.exports = (express, app) => {
  const controller = require("../controllers/cart.controller.js");
  const router = express.Router();

  // Select all carts.
  router.get("/", controller.getAll);

  //get cart by user id
  //ex http://localhost:4000/api/cart/3
  router.get("/:user_id", controller.getCartById);

  // add to cart
  router.post("/", controller.create);

  // remove from cart by user id
  router.delete("/:user_id", controller.delete);

  //remove item from cart by user id and product id
  router.delete("/", controller.deleteOneCart);

  // update quantity
  router.put("/", controller.update);

  // Add routes to server.
  app.use("/api/cart", router);
};