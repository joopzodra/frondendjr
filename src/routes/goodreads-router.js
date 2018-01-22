const express = require('express');
const request = require('request');
const goodreads = express.Router();

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
