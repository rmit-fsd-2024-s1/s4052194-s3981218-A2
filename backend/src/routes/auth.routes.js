const { body } = require('express-validator');

module.exports = (express, app) => {
  const controller = require("../controllers/auth.controller.js");
  const router = express.Router();
  
  // Sign in
  router.post("/signin", [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ], controller.signIn);
  
  // Add routes to server
  app.use("/api/auth", router);
};
