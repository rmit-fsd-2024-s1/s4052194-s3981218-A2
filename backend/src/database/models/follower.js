module.exports = (db, DataTypes) =>
  db.sequelize.define(
    "follower",
    {
      user_follower: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: db.user,
          key: "user_id",
        },
      },
      user_followed: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: db.user,
          key: "user_id",
        },
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
