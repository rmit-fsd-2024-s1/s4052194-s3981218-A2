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

// Include models.
db.user = require("./models/user.js")(db, DataTypes);
db.product = require("./models/product.js")(db, DataTypes);

// FOLLOWER TABLE : Many-to-many relationship between user and user; users can have many followers and a user can follow many users.
db.follower = require("./models/follower.js")(db, DataTypes);
db.user.belongsToMany(db.user, {
  through: db.follower,
  as: "user_follower",
  foreignKey: "user_followed",
});
db.user.belongsToMany(db.user, {
  through: db.follower,
  as: "user_followed",
  foreignKey: "user_follower",
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
  db.follower.bulkCreate([
    { user_follower: 19, user_followed: 18 },
    { user_follower: 18, user_followed: 19 },
    { user_follower: 1, user_followed: 18 }
  ]);
  // Only seed data if necessary.
}

module.exports = db;
  