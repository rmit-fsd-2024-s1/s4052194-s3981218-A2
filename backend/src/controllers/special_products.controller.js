const db = require("../database");

// Get all special products
exports.getAllSpecialProducts = (req, res) => {
  db.special_product
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving special products.",
      });
    });
};

// Get special product by ID
exports.getSpecialProductById = (req, res) => {
  const { special_product_id } = req.params;

  if (!special_product_id) {
    return res.status(400).send({
      message: "special_product_id cannot be empty!",
    });
  }

  db.special_product
    .findByPk(special_product_id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Special Product with id ${special_product_id} not found.`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving special product.",
      });
    });
};

// Create a new special product
exports.createSpecialProduct = (req, res) => {
  const { product_id } = req.body;

  db.special_product
    .create({product_id})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating special product.",
      });
    });
};

// Delete special product by ID
exports.deleteSpecialProduct = (req, res) => {
  const { special_product_id } = req.params;

  if (!special_product_id) {
    return res.status(400).send({
      message: "special_product_id cannot be empty!",
    });
  }

  db.special_product
    .destroy({
      where: { special_product_id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Special Product was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Special Product with id=${special_product_id}. Maybe Special Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Special Product with id=" + special_product_id,
      });
    });
};
