module.exports = (express, app) => {
  const controller = require("../controllers/profile.controller.js");
  const router = express.Router();

  // Select all profiles.
  router.get("/", controller.all);

  // Select a single profile with email.
  router.get("/select/:email", controller.one);

  // Update a profile.
  router.put("/", controller.update);

  // Add routes to server.
  app.use("/api/profiles", router);
};
