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
  const {comment,score,user_id,product_id} = req.body;
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
  const {review_id} = req.body;
  db.review
    .destroy({
      where: {
        review_id: review_id, //to store review ID in the front end
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
  const {review_id,score,comment} = req.body
  db.review.update(
    { score: score, comment: comment },
    {
      where: {
        review_id: review_id,
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
