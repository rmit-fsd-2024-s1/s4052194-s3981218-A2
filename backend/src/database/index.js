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
  allownull: false
});
db.order_item.hasMany(db.order, { foreignKey: "order_item_id",unique: true });
db.order.belongsTo(db.order_item, {
  foreignKey: { name: "order_item_id",unique: true  },
  as: "order_item",
  allownull: false
}); 

//Relate order items and product
db.product.hasMany(db.order_item, { foreignKey: "product_id" });
db.order_item.belongsTo(db.product, {
  foreignKey: { name: "product_id" },
  allownull: false
});
//Relate cart and user
db.user.hasMany(db.cart, { foreignKey: "user_id" });
db.cart.belongsTo(db.user, {
  foreignKey: { name: "user_id" },
  allownull: false
});
db.product.hasMany(db.cart, { foreignKey: "product_id" });
db.cart.belongsTo(db.product, {
  foreignKey: { name: "product_id" },
  allownull: false
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
  allownull: false
});
db.user.belongsToMany(db.user, {
  through: db.follower,
  as: "user_followed",
  foreignKey: "user_follower",
  allownull: false
});
//Relate review,product and user
db.user.hasMany(db.review, { foreignKey: "user_id" });
db.product.hasMany(db.review, { foreignKey: "product_id" });
db.review.belongsTo(db.user, {
  foreignKey: { name: "user_id" },
  allownull: false
});
db.review.belongsTo(db.product, {
  foreignKey: { name: "product_id" },
  allownull: false
});
// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });

  await seedData();
};

async function seedData() {
  // db.special_product.bulkCreate([
  //   { product_id: 1 }
  // ]);
  // Only seed data if necessary.
}

module.exports = db;
