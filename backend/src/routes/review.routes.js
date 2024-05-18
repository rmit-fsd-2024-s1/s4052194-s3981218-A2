module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  //get all
  router.get("/",controller.getAll);
  // add review
  router.post("/", controller.create);
  //delete reivew
  router.delete("/", controller.delete);
  //update review
  router.patch("/", controller.update);
  app.use("/api/review", router);
};
