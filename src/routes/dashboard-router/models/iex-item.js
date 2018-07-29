module.exports = (sequelize, DataTypes) => {

  const IexItem = sequelize.define('iex-item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    symbol: {
      type: DataTypes.TEXT
    },
    company: {
      type: DataTypes.TEXT
    },
    quote: {
      type: DataTypes.TEXT
    },
    day: {
      type: DataTypes.TEXT
    },
    month: {
      type: DataTypes.TEXT
    },
    two_years: {
      type: DataTypes.TEXT
    }    
  });

  return IexItem;
}