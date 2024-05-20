const db = require("../database");

// Get all followers
exports.getAllFollowers = (req, res) => {
  db.follower
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving followers.",
      });
    });
};

// Get followers by user ID
exports.getFollowersByUserId = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).send({
      message: "user_id cannot be empty!",
    });
  }

  db.follower
    .findAll({
      where: { user_followed: user_id },
    })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).send({
          message: `No followers found for user with id ${user_id}.`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving followers.",
      });
    });
};

// Get users followed by a user
exports.getFollowedByUserId = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).send({
      message: "user_id cannot be empty!",
    });
  }

  db.follower
    .findAll({
      where: { user_follower: user_id },
    })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).send({
          message: `User with id ${user_id} is not following anyone.`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving followed users.",
      });
    });
};

// Follow a user
exports.followUser = (req, res) => {
  const { user_follower, user_followed } = req.body;

  if (!user_follower || !user_followed) {
    return res.status(400).send({
      message: "Both user_follower and user_followed cannot be empty!",
    });
  }

  db.follower
    .create({
      user_follower,
      user_followed,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while following the user.",
      });
    });
};

// Unfollow a user
exports.unfollowUser = (req, res) => {
  const { user_follower, user_followed } = req.body;

  if (!user_follower || !user_followed) {
    return res.status(400).send({
      message: "Both user_follower and user_followed cannot be empty!",
    });
  }

  db.follower
    .destroy({
      where: { user_follower, user_followed },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Unfollowed the user successfully!",
        });
      } else {
        res.send({
          message: `Cannot unfollow user. Maybe the follow relationship was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not unfollow the user.",
      });
    });
};
