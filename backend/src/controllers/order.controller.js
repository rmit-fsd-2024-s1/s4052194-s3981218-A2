const db = require("../database");

//get all orders
exports.getAll = async (req, res) => {
  const order = await db.order.findAll({
    include:{model: db.order_item, as:"order_item"}
});
  res.json(order);
};

