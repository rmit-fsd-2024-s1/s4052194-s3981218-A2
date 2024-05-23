module.exports = (db, DataTypes) =>
  db.sequelize.define(
    "review",
    {
      review_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {  
          len: [1, 100]
        }
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min:1,
          max:5
        } 
      }
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: true,
    }
  );
