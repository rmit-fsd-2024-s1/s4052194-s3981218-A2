//For authentication of the signin user
const db = require("../database");
const bcrypt = require("bcryptjs");

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Email and password cannot be empty!",
    });
  }

  db.user
    .findOne({
      where: { email },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found.",
        });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password_hash);

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid password.",
        });
      }

      res.send({
        user_id: user.user_id,
        username: user.username,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while signing in.",
      });
    });
};
