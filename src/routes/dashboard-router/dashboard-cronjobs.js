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
const IexItem = sequelize.import(path.join(__dirname, 'models/iex-item'));
const { DateTime } = require('luxon');

module.exports = {
  cronJob: new cronJob('00,20,40 * * * * *', updateNews),
  cronJobQuarterly: new cronJob('00 00,15,30,45 * * * *', getQuarterlyNews),
  cronJobHalfHourly: new cronJob('00 01,31 * * * *', getHalfHourlyNews),
  cronJobThreeHourly: new cronJob('00 02 0,6,9,12,15,18,21 * * *', getThreeHourlyNews),
  cronJobDaily: new cronJob('00 33 23 * * *', getDailyNews)
};

function updateNews() {
}
function getQuarterlyNews() {
  getNosNews();
  getIexDay();
}
function getHalfHourlyNews() {
  getCurrentWeather()  
  getForecast();
}
function getThreeHourlyNews() {
  getGuardianNews();
}
function getDailyNews() {
  getIexLongterm();
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
      return OpenWeatherMapItem.update({forecast: JSON.stringify({city: cityName, data: selectedData})}, {where: {city: cityName.toLowerCase().replace(/ /g, '')}});
    })
    .catch(err => console.log(err));
  })
}

/* IEX */
function timeMsToIso(timeInMs) {
  const newYorkTimeIso = DateTime.fromMillis(timeInMs).setZone('America/New_York');
  const amsterdamTimeIso = DateTime.fromISO(newYorkTimeIso, {zone: 'Europe/Amsterdam'});
  const weekday = newYorkTimeIso.weekday;
  return {newYorkTimeIso: newYorkTimeIso, amsterdamTimeIso: amsterdamTimeIso, weekday: weekday}
}
const companySymbols = 'aapl,googl,goog,msft,fb,intc,adbe,twtr,asml,nxpi,inxn';
function getIexDay() {
  const urlDay = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${companySymbols}&types=quote,chart&range=1d&chartSimplify=true`;
  request(urlDay)
  .then(res => {
    const processed = processIexQuotesAndCharts(res);
    const processedQuotes = processed.quotes;
    const processedCharts = processed.charts;
    const quotesPromises = processedQuotes.map(company => updateIexQuoteColumn(company));
    const chartsPromises = processedCharts.map(company => updateIexChartColumn(company, 'day'));
    const allPromises = chartsPromises.reduce((collector, item) => {
      collector.push(item);
      return collector;
    }, quotesPromises);
    return Promise.all(allPromises)
  })
  .catch(err => console.log(err));
}
function getIexLongterm() {
 const urlMonth = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${companySymbols}&types=chart&range=1m&chartSimplify=true`;
 const urlTwoYears = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${companySymbols}&types=chart&range=2y&chartSimplify=true`;

 [['month', urlMonth],['two_years', urlTwoYears]]
 .forEach(url => {
  request(url[1])
  .then(res => {
    const processedCharts = processIexLongtermCharts(res);
    return Promise.all(processedCharts.map(company => updateIexChartColumn(company, url[0])));
  })
  .catch(err => console.log(err));
});
}
function processIexQuotesAndCharts(res) {
  const parsed = JSON.parse(res);
  const companySymbols = Object.keys(parsed);
  const processedQuotes = companySymbols.map(companySymbol => processIexQuote(companySymbol, parsed));
  const processedCharts = companySymbols.map(companySymbol => processIexDayChart(companySymbol, parsed));
  return { quotes: processedQuotes, charts: processedCharts }
}
function processIexQuote(companySymbol, parsed) {
  const companyQuote = parsed[companySymbol].quote;
  return {
    symbol: companySymbol,
    quoteData: {
      company_name: companyQuote.companyName,
      latest_update: timeMsToIso(companyQuote.latestUpdate),
      latest_price: companyQuote.latestPrice
    }
  }
}
function processIexDayChart(companySymbol, parsed) {
  const companyChart = parsed[companySymbol].chart;
  return {
    symbol: companySymbol,
    chartData: companyChart.map(chartItem => {
      return {
        date: chartItem.date,
        time: chartItem.minute,
        price: chartItem.close
      }
    })
  }
}
function processIexLongtermCharts(res) {
  const parsed = JSON.parse(res);
  const companySymbols = Object.keys(parsed);
  const processed = companySymbols.map(companySymbol =>  processIexLongtermChart(companySymbol, parsed));
  return processed;
}
function processIexLongtermChart(companySymbol, parsed) {
  const companyChart = parsed[companySymbol].chart;
  return {
    symbol: companySymbol,
    chartData: companyChart.map(chartItem => {
      return {
        date: chartItem.date,
        price: chartItem.close
      }
    })
  }
}
function updateIexQuoteColumn(company) {
      return IexItem.update({
        quote: JSON.stringify({
          symbol: company.symbol,
          quote_data: company.quoteData
        })
      },
      {
        where: {
          symbol: company.symbol
        }
      })
}
function updateIexChartColumn(company, column) {
      return IexItem.update({
        [column]: JSON.stringify({
          symbol: company.symbol,
          chart_data: company.chartData
        })
      },
      {
        where: {
          symbol: company.symbol
        }
      })
}
