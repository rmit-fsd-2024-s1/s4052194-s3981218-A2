module.exports = (express, app) => {
    const controller = require("../controllers/special_products.controller.js");
    const router = express.Router();
  
    // Get all special products
    router.get("/", controller.getAllSpecialProducts);
  
    // Get special product by ID
    router.get("/:special_product_id", controller.getSpecialProductById);
  
    // Create a new special product
    router.post("/", controller.createSpecialProduct);
  
    // Delete special product by ID
    router.delete("/:special_product_id", controller.deleteSpecialProduct);
  
    // Add routes to server
    app.use("/api/special_products", router);
  };
  