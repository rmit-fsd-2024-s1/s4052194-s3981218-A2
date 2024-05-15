module.exports = (db, DataTypes) =>
  db.sequelize.define(
    "product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_name: {
        type: DataTypes.STRING(96),
        allowNull: false
      },
      product_price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      product_image: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      product_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
