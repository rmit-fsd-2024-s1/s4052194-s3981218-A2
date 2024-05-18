const db = require("../database");

//get all reviews
exports.getAll = (req, res) => {
    db.review
      .findAll()
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
  const comment = req.body.comment;
  const score = req.body.score;
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;
  if (comment.length === 0 || comment.length > 100) {
    return res
      .status(400)
      .send({ message: "comment length exceeded 100 characters" });
  }
  if (score < 1 || score > 5) {
    return res
      .status(400)
      .send({ message: "score can't be more than 5 or less than 1" });
  }
  db.review
    .create({
      user_id: user_id,
      product_id: product_id,
      score: score,
      comment: comment,
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
  const reviewId = req.body.review_id;
  db.review
    .destroy({
      where: {
        review_id: reviewId, //to store review ID in the front end
      },
    })
    .then((data) => {
      if (data === 0) {
        res.status(400).send({ message: "The review is not found" });
      } else {
        res.send(`deleted: ${data} row `);
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
//edit review
exports.update = (req, res) => {
  //user id, review id, comment or score
  const reviewId = req.body.review_id;
  const newScore = req.body.score;
  const newComment = req.body.comment;
  db.review.update(
    { score: newScore, comment: newComment },
    {
      where: {
        review_id: reviewId,
      },
    }
  ).then((data) => {
    console.log(data)
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
