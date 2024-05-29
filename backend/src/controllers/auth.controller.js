const db = require("../database");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await db.user.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password_hash);
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    res.status(200).send({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      blocked_status: user.blocked_status
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while signing in.",
    });
  }
};
