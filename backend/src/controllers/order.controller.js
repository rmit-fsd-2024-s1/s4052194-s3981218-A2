const db = require("../database");

//get all orders
exports.getAll = async (req, res) => {
  const order = await db.order.findAll();
  res.json(order);
};

