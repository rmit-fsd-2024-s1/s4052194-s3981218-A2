module.exports = (express, app) => {
    const controller = require("../controllers/product.controller.js");
    const router = express.Router();
  
    // Get all products
    router.get("/", controller.getAllProducts);
  
    // Get product by ID
    router.get("/:product_id", controller.getProductById);
  
    // Create a new product
    router.post("/", controller.createProduct);
  
    // Update product by ID
    router.put("/:product_id", controller.updateProduct);
  
    // Delete product by ID
    router.delete("/:product_id", controller.deleteProduct);
  
    // Add routes to server
    app.use("/api/products", router);
  };
  