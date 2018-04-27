module.exports = (sequelize, DataTypes) => {

  const Poet = sequelize.define('poet', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    born: {
      type: DataTypes.INTEGER,
      validate: {
        len: [0, 4]     
      }  
    },
    died: {
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
    },
    img_url: {
      type: DataTypes.TEXT
    }
  });

  return Poet;
};