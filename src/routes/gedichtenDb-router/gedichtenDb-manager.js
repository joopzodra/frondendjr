const express = require('express');
const Sequelize = require('sequelize');
const gedichtenDbManager = express.Router();
const path = require('path');

const sequelize = new Sequelize('sqlite:./src/routes/gedichtenDb-router/gedichtenDb.db');
const User = sequelize.import(path.join(__dirname, 'models/user'));

sequelize
  .authenticate()
  .then(() => { console.log(path.join(__dirname, 'models/user'))
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    res.json({type: 'fout'})
  }
}



gedichtenDbManager.get('/', ensureAuthenticated, (req, res) => {
/*User.sync()

  User.create({
      username: 'jan',
      password: 'janno'
    })
    .then(user => res.json(user));*/

res.json('hi from express gedichtendbmanager');

});


gedichtenDbManager.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.send('Er is helaas een probleem met de server. Probeer het later opnieuw.');
});

module.exports = gedichtenDbManager;