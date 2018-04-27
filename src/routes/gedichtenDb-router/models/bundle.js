module.exports = (sequelize, DataTypes) => {

  const Bundle = sequelize.define('bundle', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    poet_id: {
      type: DataTypes.INTEGER
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        len: [0, 4]      
      }
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return Bundle;
};