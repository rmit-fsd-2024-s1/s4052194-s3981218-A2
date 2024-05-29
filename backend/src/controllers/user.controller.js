const db = require("../database");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

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
exports.create = async (req, res) => {
  const { username, email, password, is_admin } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({
      message: "Username, email, and password cannot be empty!",
    });
  }

  try {
    const existingUsername = await db.user.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).send({ message: "This username is already used." });
    }

    const existingEmail = await db.user.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).send({ message: "This email address is already used." });
    }

    const date_joined = new Date();
    const password_hash = bcrypt.hashSync(password, 10);

    const newUser = await db.user.create({
      username,
      email,
      password_hash,
      date_joined,
      is_admin: is_admin || false,
    });

    res.send(newUser);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while creating user." });
  }
};

// Update user by ID
exports.update = async (req, res) => {
  const { user_id } = req.params;
  const { username, email, password, is_admin } = req.body;

  if (!user_id) {
    return res.status(400).send({ message: "user_id cannot be empty!" });
  }

  const password_hash = password ? bcrypt.hashSync(password, 10) : undefined;

  try {
    const existingUsername = await db.user.findOne({ where: { username } });
    if (existingUsername && existingUsername.user_id !== parseInt(user_id)) {
      return res.status(400).send({ message: "Username is already taken." });
    }

    const existingEmail = await db.user.findOne({ where: { email } });
    if (existingEmail && existingEmail.user_id !== parseInt(user_id)) {
      return res.status(400).send({ message: "Email is already registered." });
    }

    const [updated] = await db.user.update(
      { username, email, password_hash, is_admin },
      { where: { user_id } }
    );

    if (updated) {
      const updatedUser = await db.user.findByPk(user_id);
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: `User with id=${user_id} not found.` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Error updating User with id=" + user_id });
  }
};

// Delete user by ID
exports.delete = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).send({ message: "user_id cannot be empty!" });
  }

  try {
    const deleted = await db.user.destroy({ where: { user_id } });
    if (deleted) {
      res.send({ message: "User was deleted successfully!" });
    } else {
      res.status(404).send({ message: `User with id=${user_id} not found.` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Could not delete User with id=" + user_id });
  }
};

// Check if username exists
exports.checkUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await db.user.findOne({ where: { username } });
    if (user) {
      res.send({ exists: true, user_id: user.user_id });
    } else {
      res.send({ exists: false });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while checking username." });
  }
};
