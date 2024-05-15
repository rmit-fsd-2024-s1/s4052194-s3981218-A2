module.exports = (db, DataTypes) =>
  db.sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
      date_joined: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
