const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  const Bundle = sequelize.define('bundle', {
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
        len: [4]      
      }
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  });

  return Bundle;
};