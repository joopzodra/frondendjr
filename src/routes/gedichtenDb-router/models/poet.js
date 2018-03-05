const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  const Poet = sequelize.define('poet', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    born: {
      type: DataTypes.INTEGER,
      validate: {
        len: [4]     
      }  
    },
    died: {
      type: DataTypes.INTEGER,
      validate: {
        len: [4]      
      }  
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  });

  return Poet;
};