module.exports = (express, app) => {
    const controller = require("../controllers/follower.controller.js");
    const router = express.Router();
  
    // Get all followers
    router.get("/", controller.getAllFollowers);
  
    // Get followers by user ID
    router.get("/followers/:user_id", controller.getFollowersByUserId);
  
    // Get users followed by a user
    router.get("/following/:user_id", controller.getFollowedByUserId);
  
    // Follow a user
    router.post("/", controller.followUser);
  
    // Unfollow a user
    router.delete("/", controller.unfollowUser);
  
    // Add routes to server
    app.use("/api/followers", router);
  };
  