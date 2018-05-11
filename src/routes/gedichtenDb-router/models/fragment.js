module.exports = (sequelize, DataTypes) => {

  const Fragment = sequelize.define('fragment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fragment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    poet: {
      type: DataTypes.TEXT  
    },
    poet_img: {
      type: DataTypes.TEXT 
    },
    source_url_label: {
      type: DataTypes.TEXT
    },
    source_url: {
      type: DataTypes.TEXT
    },
    time: {
      type: DataTypes.TEXT
    }
  });

  return Fragment;
};