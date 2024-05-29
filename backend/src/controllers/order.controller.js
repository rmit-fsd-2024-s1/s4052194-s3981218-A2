const db = require("../database");

//get all orders
exports.getAll = async (req, res) => {
  const order = await db.order.findAll({
    include: { model: db.order_item, as: "order_item" },
  });
  res.json(order);
};

//get all orders with order item by a user id
exports.getOrderByUserId = async (req, res) => {
  const id = req.params.id;
  db.order
    .findAll({
      where: {
        user_id: id,
      },
      include: { model: db.order_item, as: "order_item" },
    })
    .then((data) => {
        if (data.length === 0) {
            res.status(400).send({message:"this user has 0 order item"})
        } else {
            res.send(data);

        }
    })
    .catch((err) => {
      res.status(500).send({ message: "error" });
    });
};

exports.create = async (req,res) => {
    //create an order item
    let order_item_id;
   await db.order_item.create({
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    })
    .then((data) => {
        order_item_id = data.dataValues.order_item_id;
    })  
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding cart.",
      });
    });
  //  then create an order
   await db.order
    .create({
      user_id: req.body.user_id,
      order_item_id: order_item_id,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding cart.",
      });
    });
}

//delete order item by user id
exports.deleteItemByUserId = (req,res) => {
  db.order.destroy( {where: {
    user_id:req.body.user_id
  } }
  ).then((data) => {
    if (data === 0) {
      res.status(400).send({message:"user id not found in the order table"})
    } else {
      res.send(`successfully deleted all order items of user id ${req.body.user_id}`)
    }
  }).catch((err) =>{
    res.status(500).send({
      message: err.message || "Some error occurred while deleting an order row."})
  })
}