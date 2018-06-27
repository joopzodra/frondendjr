module.exports = (sequelize, DataTypes) => {

  const OpenWeatherMapItem = sequelize.define('openweathermap-item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    city: {
      type: DataTypes.TEXT
    },
    current_weather: {
      type: DataTypes.TEXT
    },
    forecast: {
      type: DataTypes.TEXT
    }
  });

  return OpenWeatherMapItem;
};
