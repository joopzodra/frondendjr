module.exports = (sequelize, DataTypes) => {

  const GuardianItem = sequelize.define('guardian-item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    data: {
      type: DataTypes.TEXT
    }
  });

  return GuardianItem;
};
