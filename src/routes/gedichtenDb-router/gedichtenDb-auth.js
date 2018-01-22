const express = require('express');
const passport = require('passport');
const gedichtenDbAuth = express.Router();

gedichtenDbAuth.post('/login', function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        authUser: false
      });
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
    req.session.destroy(); //NODIG???? Of req.session.store.destroy() of zoiets?
    res.json({
      loggedOut: true
    });
  });

gedichtenDbAuth.post('/signup', function(req, res, next) {
  User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then(user => {
      res.status(201);
      res.json({
        userName: user.username
      });
    })
    .catch(err => next(err));
});

gedichtenDbAuth.use((err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(409);
    res.send('username-already-exists');
  } else if (err.name === 'SequelizeValidationError') {
    res.status(400);
    res.send('Invalid data from user')
  }
   else {
    res.status(500);
    res.send('Database error (JR)');
  }
});

module.exports = gedichtenDbAuth;
