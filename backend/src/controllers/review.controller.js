const db = require("../database");
const { Op } = require("sequelize");
//get all reviews
exports.getAll = (req, res) => {
  db.review
    .findAll({ include: { model: db.user, as: "user" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cart.",
      });
    });
};

//add a review by user id,product id,  comment and score
exports.create = async (req, res) => {
  const { comment, score, user_id, product_id, parent_id } = req.body;
  if (comment.length === 0 || comment.length > 100) {
    return res
      .status(400)
      .send({ message: "comment length exceeded 100 characters" });
  }

  db.review
    .create({
      user_id: user_id,
      product_id: product_id,
      score: score,
      comment: comment,
      parent_id: parent_id,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding cart.",
      });
    });
};

//delete review by id
exports.delete = (req, res) => {
  const { review_id } = req.body;
  console.log("this is request", review_id);

  try {
    db.review.destroy({
      where: {
        parent_id: review_id,
      },
    });

    db.review.destroy({
      where: {
        review_id: review_id,
      },
    });
    res.send("Deletion complete");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      message: "Some error occurred while deleting rows.",
    });
  }
};
//edit review
exports.update = (req, res) => {
  //user id, review id, comment or score
  const { review_id, score, comment } = req.body;
  db.review
    .update(
      { score: score, comment: comment },
      {
        where: {
          review_id: review_id,
        },
      }
    )
    .then((data) => {
      console.log(data);
      if (data[0] === 0) {
        res.status(400).send({ message: "The review is not found" });
      } else {
        res.send(`updated: ${data} row `);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting a cart row.",
      });
    });
};
