const db = require("../database");

//get all carts
exports.getAll = (req, res) => {
  db.cart
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

//get carts by id
exports.getCartById = (req, res) => {
  if (!req.params.user_id) {
    res.status(400).send({
      message: "user_id can not be empty!"
    });
    return
  }
  db.cart
    .findAll({
      where: {
        user_id: req.params.user_id,
      },
    })
    .then((data) => {
      if(data.length === 0) {
        res.status(400).send({
          message: "This user has no cart!"
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cart.",
      });
    });
};
//Add a cart to the database
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "user id can not be empty!",
    });
    return;
  }
  if (!req.body.product_id) {
    res.status(400).send({
      message: "product_id can not be empty!",
    });
    return;
  }
  if (!req.body.quantity) {
    res.status(400).send({
      message: "quantity can not be empty!",
    });
    return;
  }
  db.cart
    .create({
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
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
// Select one profile from the database.
exports.delete = (req, res) => {
  if (!req.params.user_id) {
    res.status(400).send({
      message: "user_id can not be empty!"
    });
    return
  }
  db.cart.destroy({
    where: {
      user_id: req.params.user_id,
    },
  })
  .then((data)=>{
    if (data === 0) {
      res.status(400).send({message:"this user has 0 cart item"})
    } else {
      res.send(`deleted: ${data} row `);
    }})
  .catch((err)=>{
    console.log(err)
    res.status(500).send({
    message: err.message || "Some error occurred while deleting a cart row.",
  })});
};
