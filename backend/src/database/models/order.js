module.exports = (db, DataTypes) =>
  db.sequelize.define(
    "order",
    {
      order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
      order_items_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
