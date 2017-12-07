const express = require('express');
const cors = require('cors');
const request = require('request');
const goodreads = express.Router();

// CORS async, see https://www.npmjs.com/package/cors
/*var whitelist = ['http://frontendjr.nl', 'https://frontend.jr.nl, http://localhost:8000'];
var corsOptionsDelegate = function(req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true
    };
  } else {
    corsOptions = {
      origin: false
    };
  }
  callback(null, corsOptions);
};

goodreads.use(cors(corsOptionsDelegate), function(req, res, next) {
  next();
});*/

goodreads.get('/api/search/*', function(req, res, next) {
  var searchString = req.url.substr(12);
  var newurl = 'https://www.goodreads.com/search/index.xml?key=nyf6qHIgOma1irUOdxFXZw&q=' + searchString;
  request
    .get(newurl)
    .on('error', function(err) {
      //TO DO
    })
    .pipe(res);
});

goodreads.get('/api/author/*', function(req, res, next) {
  var searchString = req.url.substr(12);
  var newurl = 'https://www.goodreads.com/author/show/' + searchString + '.xmli?key=nyf6qHIgOma1irUOdxFXZw';
  request
    .get(newurl)
    .on('error', function(err) {
      //TO DO
    }).pipe(res);
});

goodreads.get('/api/book/*', function(req, res, next) {
  var searchString = req.url.substr(10);
  var newurl = 'https://www.goodreads.com/book/show/' + searchString + '.xml?key=nyf6qHIgOma1irUOdxFXZw';
  request
    .get(newurl)
    .on('error', function(err) {
      //TO DO
    })
    .pipe(res);
});

goodreads.use(function(req, res) {
  res.status(404);
  res.send('Pagina niet gevonden.');
});

module.exports = goodreads;
