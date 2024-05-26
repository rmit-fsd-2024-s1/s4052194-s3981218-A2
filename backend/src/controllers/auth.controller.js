const db = require("../database");
const bcrypt = require('bcryptjs');

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Email and password cannot be empty!",
    });
  }

  try {
    const user = await db.user.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({
        message: "User not found.",
      });
    }

    // if (user.blocked_status) {
    //   return res.status(403).send({
    //     message: "User is blocked. Please contact support.",
    //   });
    // }

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
      blocked_status:user.blocked_status
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while signing in.",
    });
  }
};
