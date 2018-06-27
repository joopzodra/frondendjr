const cronJob = require('cron').CronJob;
const path = require('path');
const request = require('request-promise-native');
const parseString = require('xml2js').parseString;
const dbPath = path.join(__dirname, 'dashboard.db');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:' + dbPath, {logging: false});
const GuardianItem = sequelize.import(path.join(__dirname, 'models/guardian-item'));
const NosItem = sequelize.import(path.join(__dirname, 'models/nos-item'));
const OpenWeatherMapItem = sequelize.import(path.join(__dirname, 'models/openweathermap-item'));

module.exports = {
  cronJob: new cronJob('00,20,40 * * * * *', updateNews),
  cronJobQuarterly: new cronJob('00 00,15,30,45 * * * *', getQuarterlyNews),
  cronJobHalfHourly: new cronJob('00 01,31 * * * *', getHalfHourlyNews),
  cronJobFourHourly: new cronJob('00 02 0,8,12,16,20 * * *', getFourHourlyNews)
};

function updateNews() {
}
function getQuarterlyNews() {
  getNosNews();
}
function getHalfHourlyNews() {
  getCurrentWeather()  
}
function getFourHourlyNews() {
  getGuardianNews();
  getForecast();
}

/* Guardian */
const guardianKey = 'e889da60-a62c-4605-9ecb-e2ab7469ffba';
function getGuardianNews() {
  const baseUrl = 'https://content.guardianapis.com/search';
  const section = 'technology';
  const pageSize = '20';
  const searchString = `?api-key=${guardianKey}&section=${section}&page-size=${pageSize}`;  
  const url = baseUrl + searchString;
  request(url)
  .then(response => {
    const items = JSON.parse(response).response.results;
    const urls = items.map(item => item.apiUrl);
    return Promise.all(urls.map(url => getGuardianSingle(url)))
  })
  .then(result => {
    const action = result.map((item, i) => GuardianItem.update({data: item}, {where: {id: i + 1}}));
    return sequelize.transaction(function(t) {
      return Promise.all(action);
    })
  }) 
  .catch(err => console.log(err));
}
function getGuardianSingle(url) {
  const showFields = 'trailText,thumbnail,body';
  const singleUrl = `${url}?show-fields=${showFields}&api-key=${guardianKey}`;
  return request(singleUrl)
  .catch(err => console.log(err));
};

/* NOS */
function getNosNews() {
  const url = 'http://feeds.nos.nl/nosnieuwsalgemeen';
  request(url)
  .then(response => {
    parseString(response, function(err, result) {
      const items = result.rss.channel[0].item.slice(0,20);
      const action = items.map((item, i) => NosItem.update({data: JSON.stringify(item)}, {where: {id: i + 1}}));
      return sequelize.transaction(function(t) {
        return Promise.all(action);
      })
    })
  })
  .catch(err => console.log(err));
}

/* OpenWeatherMap */
const openWeatherMapKey = '13478c4b0300656718f6147dc98c8031';
cityIds = '2759794,2747891,2745912,2755251,2743478,2756071,2750053,2756253,2751283,2750896,2757220';
function getCurrentWeather() {
  const url = `http://api.openweathermap.org/data/2.5/group?appid=${openWeatherMapKey}&units=metric&lang=nl&id=${cityIds}`;
  request(url)
  .then(res => {
    const cityDataArray = JSON.parse(res).list
    const items = cityDataArray.map(item => {
      return {
        city: item.name,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        temp: Math.round(item.main.temp),
        wind_speed: Math.round(item.wind.speed),
        wind_direction: Math.round(item.wind.deg)
      }
    })
    const action = items.map((item, i) => OpenWeatherMapItem.update({current_weather: JSON.stringify(item)}, {where: {id: i + 1}}));
    return sequelize.transaction(function(t) {
      return Promise.all(action);
    })
  })
  .catch(err => console.log(err));
}
function getForecast() {
  const cityIdsArray = cityIds.split(',');
  cityIdsArray.forEach(cityId => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?appid=${openWeatherMapKey}&units=metric&lang=nl&id=${cityId}&cnt=17`;
    request(url)
    .then(res => {
      const parsed = JSON.parse(res);
      const threeHourlyArray = parsed.list;
      const cityName = parsed.city.name;
      const selectedData = threeHourlyArray.map(data => {
        return {
          datetime: data.dt,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          temp: Math.round(data.main.temp),
          wind_speed: Math.round(data.wind.speed),
          wind_direction: Math.round(data.wind.deg)
        }
      });
      return OpenWeatherMapItem.update({forecast: JSON.stringify({city: cityName, data: selectedData})}, {where: {city: cityName}});
    })
    .catch(err => console.log(err));
  })
}
