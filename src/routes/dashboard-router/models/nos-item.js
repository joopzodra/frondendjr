module.exports = (sequelize, DataTypes) => {

  const NosItem = sequelize.define('nos-item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    data: {
      type: DataTypes.TEXT
    }
  });

  return NosItem;
};
