const db = require("../database");
const bcrypt = require('bcryptjs');

// Get all users
exports.getAll = (req, res) => {
  db.user
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).send({
      message: "user_id cannot be empty!",
    });
  }

  db.user
    .findByPk(user_id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `User with id ${user_id} not found.`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

// Create a new user
exports.create = (req, res) => {
  const { username, email, password, is_admin } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({
      message: "Username, email, and password cannot be empty!",
    });
  }

  const date_joined = new Date();
  const password_hash = bcrypt.hashSync(password, 10);

  db.user
    .create({
      username,
      email,
      password_hash,
      date_joined,
      is_admin: is_admin || false,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user.",
      });
    });
};

// Update user by ID
exports.update = (req, res) => {
  const { user_id } = req.params;
  const { username, email, password, is_admin } = req.body;

  if (!user_id) {
    return res.status(400).send({
      message: "user_id cannot be empty!",
    });
  }

  const password_hash = password ? bcrypt.hashSync(password, 10) : undefined;

  db.user
    .update(
      {
        username,
        email,
        password_hash,
        is_admin,
      },
      {
        where: { user_id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${user_id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with id=" + user_id,
      });
    });
};

// Delete user by ID
exports.delete = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).send({
      message: "user_id cannot be empty!",
    });
  }

  db.user
    .destroy({
      where: { user_id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${user_id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete User with id=" + user_id,
      });
    });
};
