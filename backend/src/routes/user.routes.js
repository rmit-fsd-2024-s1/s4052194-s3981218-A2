module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();
  
    // Get all users
    router.get("/", controller.getAll);
  
    // Get user by ID
    router.get("/:user_id", controller.getUserById);
  
    // Create a new user
    router.post("/", controller.create);
  
    // Update user by ID
    router.put("/:user_id", controller.update);
  
    // Delete user by ID
    router.delete("/:user_id", controller.delete);

     // Check username
    router.get("/username/:username", controller.checkUsername);
  
    // Add routes to server
    app.use("/api/users", router);
  };
  