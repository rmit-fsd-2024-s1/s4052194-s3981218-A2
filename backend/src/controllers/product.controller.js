const db = require("../database");

// Get all products
exports.getAllProducts = (req, res) => {
  db.product
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products.",
      });
    });
};

// Get product by ID
exports.getProductById = (req, res) => {
  const { product_id } = req.params;

  if (!product_id) {
    return res.status(400).send({
      message: "product_id cannot be empty!",
    });
  }

  db.product
    .findByPk(product_id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Product with id ${product_id} not found.`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the product.",
      });
    });
};

// Create a new product
exports.createProduct = (req, res) => {
  const { product_name, product_price, product_image, product_stock } = req.body;

  if (!product_name || !product_price || !product_image || !product_stock) {
    return res.status(400).send({
      message: "Product name, price, image, and stock cannot be empty!",
    });
  }

  db.product
    .create({
      product_name,
      product_price,
      product_image,
      product_stock,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the product.",
      });
    });
};

// Update product by ID
exports.updateProduct = (req, res) => {
  const { product_id } = req.params;
  const { product_name, product_price, product_image, product_stock } = req.body;

  if (!product_id) {
    return res.status(400).send({
      message: "product_id cannot be empty!",
    });
  }

  db.product
    .update(
      {
        product_name,
        product_price,
        product_image,
        product_stock,
      },
      {
        where: { product_id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update product with id=${product_id}. Maybe product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating product with id=" + product_id,
      });
    });
};

// Delete product by ID
exports.deleteProduct = (req, res) => {
  const { product_id } = req.params;

  if (!product_id) {
    return res.status(400).send({
      message: "product_id cannot be empty!",
    });
  }

  db.product
    .destroy({
      where: { product_id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete product with id=${product_id}. Maybe product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete product with id=" + product_id,
      });
    });
};
