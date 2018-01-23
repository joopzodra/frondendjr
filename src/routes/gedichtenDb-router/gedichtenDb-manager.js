const express = require('express');
const Sequelize = require('sequelize');
const gedichtenDbManager = express.Router();
const path = require('path');

const dbPath = path.join(__dirname, 'gedichtenDb.db');
const sequelize = new Sequelize('sqlite:' + dbPath);
const User = sequelize.import(path.join(__dirname, 'models/user'));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    res.json({type: 'fout'});
  }
}

gedichtenDbManager.get('/', ensureAuthenticated, (req, res) => {

res.json('hi from express gedichtendbmanager');

});


gedichtenDbManager.use((err, req, res, next) => {
  console.log(err); //TODO: verwijderen!!
  res.status(500);
  res.send('Er is helaas een probleem met de server. Probeer het later opnieuw.');
});

module.exports = gedichtenDbManager;