module.exports = (express, app) => {
    const controller = require("../controllers/auth.controller.js");
    const router = express.Router();
  
    // Sign in
    router.post("/signin", controller.signIn);
  
    // Add routes to server
    app.use("/api/auth", router);
  };
  