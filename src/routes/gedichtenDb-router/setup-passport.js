const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const path = require('path');

const dbPath = path.join(__dirname, 'gedichtenDb.db');
const sequelize = new Sequelize('sqlite:' + dbPath);
const User = sequelize.import(path.join(__dirname, 'models/user'));

module.exports = function() {

  passport.use('local', new LocalStrategy(
    function(username, password, done) {
      User.findOne({
        where: {
          username: username
        }
      }).then(user => {
        if (!user) {
          return done(null, false);
        }
        user.verifyPassword(password, function(err, isMatch) {
          if(err) {
            return done(err);
          }
          if(isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }).catch(err => done(err));
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => {
        return done(null, user);
      })
      .catch(err => done(err));
  });
};
