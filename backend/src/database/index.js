const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// all models.
db.user = require("./models/user.js")(db, DataTypes);
db.product = require("./models/product.js")(db, DataTypes);
db.special_product = require("./models/special_product.js")(db, DataTypes);
db.follower = require("./models/follower.js")(db, DataTypes);
db.cart = require("./models/cart.js")(db, DataTypes);
db.order = require("./models/order.js")(db, DataTypes);
db.order_item = require("./models/order_item.js")(db, DataTypes);
db.review = require("./models/review.js")(db, DataTypes);

//Relate order, user and order items
db.user.hasMany(db.order, { foreignKey: "user_id" });
db.order.belongsTo(db.user, {
  foreignKey: { name: "user_id" },
  as: "user",
  allownull: false,
});
db.order_item.hasMany(db.order, { foreignKey: "order_item_id", unique: true });
db.order.belongsTo(db.order_item, {
  foreignKey: { name: "order_item_id", unique: true },
  as: "order_item",
  allownull: false,
});

//Relate order items and product
db.product.hasMany(db.order_item, { foreignKey: "product_id" });
db.order_item.belongsTo(db.product, {
  foreignKey: { name: "product_id" },
  allownull: false,
});
//Relate cart and user
db.user.hasMany(db.cart, { foreignKey: "user_id" });
db.cart.belongsTo(db.user, {
  foreignKey: { name: "user_id" },
  allownull: false,
});
db.product.hasMany(db.cart, { foreignKey: "product_id" });
db.cart.belongsTo(db.product, {
  foreignKey: { name: "product_id" },
  allownull: false,
});
// Relate special products and products | Special product table
db.product.hasOne(db.special_product, {
  foreignKey: { name: "product_id", unique: true },
});
// Relate user and user | Many to Many | Follower table
db.user.belongsToMany(db.user, {
  through: db.follower,
  as: "user_follower",
  foreignKey: "user_followed",
  allownull: false,
});
db.user.belongsToMany(db.user, {
  through: db.follower,
  as: "user_followed",
  foreignKey: "user_follower",
  allownull: false,
});
//Relate review,product and user
db.user.hasMany(db.review, { foreignKey: "user_id" });
db.product.hasMany(db.review, { foreignKey: "product_id" });
db.review.belongsTo(db.user, {
  foreignKey: { name: "user_id" },
  allownull: false,
});
db.review.belongsTo(db.product, {
  foreignKey: { name: "product_id" },
  allownull: false,
});
//parent reply id
db.review.belongsTo(db.review, {
  foreignKey: { name: "parent_id" },
  allownull: true,
});
// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();
  //please uncomment this below line, after that comment it and restart the server again
  //  await seedData();
};

async function seedData() {
  db.product.bulkCreate([
    {
      product_id: 1,
      product_name: "Apples",
      product_price: 2.99,
      product_stock: 5,
      product_image: "/apple.png"
    },
    {
      product_id: 2,
      product_name: "Bananas",
      product_price: 1.99,
      product_stock: 3,
      product_image: "/banana.png"
    },
    {
      product_id: 3,
      product_name: "Spinach",
      product_price: 3.49,
      product_stock: 3,
      product_image: "/spinach.png"
    },
    {
      product_id: 4,
      product_name: "Tomatoes",
      product_price: 2.79,
      product_stock: 10,
      product_image: "/tomatoes.png"
    },
    {
      product_id: 5,
      product_name: "Carrots",
      product_price: 1.49,
      product_stock: 10,
      product_image: "/carrot.png"
    },
    {
      product_id: 6,
      product_name: "Avocados",
      product_price: 33.99,
      product_stock: 120,
      product_image: "/avocado.png"
    },
    {
      product_id: 7,
      product_name: "Quinoa",
      product_price: 5.99,
      product_stock: 10,
      product_image: "/Quinoa.png"
    },
    {
      product_id: 8,
      product_name: "Blueberries",
      product_price: 6.99,
      product_stock: 10,
      product_image: "/blueberries.png"
    },
    {
      product_id: 9,
      product_name: "Kale",
      product_price: 3.99,
      product_stock: 10,
      product_image: "/Kale.png"
    },
    {
      product_id: 10,
      product_name: "Broccoli",
      product_price: 2.69,
      product_stock: 10,
      product_image: "/broccoli.png"
    },
    {
      product_id: 11,
      product_name: "Organic Vegetable Seeds",
      product_price: 2.99,
      product_stock: 1,
      product_image: "/Organic Vegetable Seeds.png"  },
    {
      product_id: 12,
      product_name: "Gardening Gloves",
      product_price: 7.99,
      product_stock: 1,
      product_image: "/Gardening Gloves.png"  },
    {
      product_id: 13,
      product_name: "Pruning Shears",
      product_price: 12.99,
      product_stock: 10,
      product_image: "/Pruning Shears.png"  },
    {
      product_id: 14,
      product_name: "Hand Trowel",
      product_price: 6.99,
      product_stock: 10,
      product_image: "/Hand Trowel.png"  },
    {
      product_id: 15,
      product_name: "Seedling Trays",
      product_price: 4.99,
      product_stock: 10,
      product_image: "/Seeding tray.png"  },
  ]);
  db.special_product.bulkCreate([{ product_id: 2},{ product_id: 4},{ product_id: 6},{ product_id: 1},{ product_id: 7}])
  // Only seed data if necessary.
}

module.exports = db;
