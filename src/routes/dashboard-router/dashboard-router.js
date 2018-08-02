const express = require('express');
const dashboard = express.Router();
const arrayWrap = require('arraywrap');
const path = require('path');
const dbPath = path.join(__dirname, 'dashboard.db');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:' + dbPath, {logging: true});
const Op = Sequelize.Op;
const GuardianItem = sequelize.import(path.join(__dirname, 'models/guardian-item'));
const NosItem = sequelize.import(path.join(__dirname, 'models/nos-item'));
const OpenWeatherMapItem = sequelize.import(path.join(__dirname, 'models/openweathermap-item'));
const IexItem = sequelize.import(path.join(__dirname, 'models/iex-item'));

// sequelize.sync();

dashboard.get('/guardian-news', function(req, res, next) {
  const pageSize = arrayWrap(req.query['page-size'] || '')[0];
  const includeBody = arrayWrap(req.query['include-body' || ''])[0];
  GuardianItem.findAll({limit: pageSize, attributes: ['data']})
  .then(items => items.map(item => JSON.parse(item.data).response.content))
  .then(items => items.map(item => ({
    title: item.webTitle,
    trailText: item.fields.trailText + '.',
    thumbnail: item.fields.thumbnail,
    body: includeBody === "true" ? item.fields.body : ''
  })))
  .then(items => res.json(items))
  .catch(err => next(err));
});

dashboard.get('/nos-news', function(req, res, next) {
  const regex = RegExp('<p>(.*?)</p>');
  const pageSize = arrayWrap(req.query['page-size'] || '')[0];
  const includeBody = arrayWrap(req.query['include-body' || ''])[0];
  NosItem.findAll({limit: pageSize, attributes: ['data']})
  .then(items => items.map(item => JSON.parse(item.data)))
  .then(items => items.map(item => {
    const regexResult = regex.exec(item.description[0]);
    return {
      title: item.title[0],
      trailText: regexResult ? regexResult[1] : '',
      thumbnail: item.enclosure ? item.enclosure[0].$.url : '',
      body: includeBody === "true" ? item.description[0] : ''
    };
  }))
  .then(items => res.json(items))
  .catch(err => next(err));
});

dashboard.get('/openweathermap', function(req, res, next) {
  const city = arrayWrap(req.query['city'] || '')[0];
  if (city === 'listcitynames') {
    OpenWeatherMapItem.findAll({attributes: ['current_weather']})
    .then(items => {
      const cityNames = items.map(item => JSON.parse(item.current_weather).city);
      res.json(cityNames);
    });
  } else if (city === 'all') {
    OpenWeatherMapItem.findAll({attributes:['city', 'current_weather', 'forecast']})
    .then(items => items.map(item => ({
      city: item.city,
      current_weather: JSON.parse(item.current_weather),
      forecast: JSON.parse(item.forecast)
    })))
    .then(items => res.json(items))
    .catch(err => next(err));
  } else {
    OpenWeatherMapItem.findOne({attributes:['current_weather', 'forecast'], where: {city: city}})
    .then(item => {
      if (item) {
        return     {
          current_weather: JSON.parse(item.current_weather),
          forecast: JSON.parse(item.forecast)
        };     
      }
    })
    .then(item => res.json(item))
    .catch(err => next(err));
  }
});

dashboard.get('/iex', function(req, res, next) {
  const widgetCompanies = ['AAPL', 'GOOG', 'FB'];
  const company = arrayWrap(req.query['company'] || '')[0];
  if (company === 'widget') {
    IexItem.findAll({attributes: ['company', 'quote', 'day'], where: {symbol: {
      [Op.or]: widgetCompanies
    }}})
    .then(items => items.map(item => {
      const parsedQuote = JSON.parse(item.quote);
      return {
        company: item.company,
        quote: parsedQuote.quote_data,
        day: JSON.parse(item.day)
      };
    }))
    .then(items => res.json(items))
    .catch(err => next(err));
  } else if (company === 'all') {
    IexItem.findAll({attributes: ['company', 'quote', 'day']})
    .then(items => items.map(item => {
      const parsedQuote = JSON.parse(item.quote);
      return {
        company: item.company,
        quote: parsedQuote.quote_data,
        day: JSON.parse(item.day)
      };
    }))
    .then(items => res.json(items))
    .catch(err => next(err));
  } else {
    IexItem.findOne({attributes: ['company', 'month', 'two_years'], where: {symbol: company.toUpperCase()}})
    .then(item => ({
      month: JSON.parse(item.month),
      twoYears: JSON.parse(item.two_years)
    }))
    .then(item => res.json(item))
    .catch(err => next(err));
  }
});

dashboard.use(function(err, req, res, next) {
  console.log(err);
  const message = 'Er is een probleem met de database.';
  res.status(500);
  res.send(message);
});

module.exports = dashboard;
