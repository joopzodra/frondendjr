const express = require('express');
const passport = require('passport');
const gedichtenDbAuth = express.Router();
const Sequelize = require('sequelize');
const path = require('path');

const dbPath = path.join(__dirname, 'gedichtenDb.db');
const sequelize = new Sequelize('sqlite:' + dbPath);
const User = sequelize.import(path.join(__dirname, 'models/user'));

const userDataHelpers = require('./user-data-helpers');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    res.json({type: 'unauthorized user'});
  }
}

gedichtenDbAuth.post('/login', function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401); 
      return res.send('unauth-user');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({
        authUser: true
      });
    });
  })(req, res, next);
});

gedichtenDbAuth.get('/logout',
  function(req, res) {
    req.logout();
    req.session.destroy(); // Deletes the session from the session-store.
    res.json({
      loggedOut: true
    });
  });

gedichtenDbAuth.post('/signup', function(req, res, next) {
  let newUser;
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(user => {
    newUser = user;
    return userDataHelpers.insertUserData(user.id);
  })
  .then(() => {
    res.status(201);
    res.json({
      userName: newUser.username
    });
  })
  .catch(err => next(err));
});

gedichtenDbAuth.get('/who', ensureAuthenticated, function(req, res) {
  let username = req.user.dataValues.username;
  res.json({username: username});
});

gedichtenDbAuth.use((err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(409);
    res.send('username-already-exists');
  } else if (err.name === 'SequelizeValidationError') {
    res.status(400);
    res.send('Invalid data from user');
  }
  else {
    res.status(500);
    res.send('Database error (JR)');
  }
});

module.exports = gedichtenDbAuth;
