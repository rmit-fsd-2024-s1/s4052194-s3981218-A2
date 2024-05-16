const db = require("../database");

//get all carts
exports.getAll = async (req, res) => {
  const carts = await db.cart.findAll();
  res.json(carts);
};

//get carts by id
exports.getCartById = async (req, res) => {
  console.log(req.params)
    const carts = await db.cart.findAll({
        where:{
            user_id:req.params.user_id
        }
    });
    res.json(carts);
  };
//Add a cart to the database
exports.create = async (req, res) => {
    const cart = await db.cart.create({
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
      });
      res.json(cart);
  };
// Select one profile from the database.
exports.delete = async (req, res) => {
  const cart = await db.cart.destroy({
    where: {
        user_id:req.params.user_id
    }
  })
  res.json(cart);
};

