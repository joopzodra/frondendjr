const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const dbPath = path.resolve(__dirname, './public/db/poetryDb.sqlite');
let db = new sqlite3.Database(dbPath);

module.exports = function() {

  passport.use( new LocalStrategy(function(username, password, done) {

    db.get('SELECT username, password FROM users WHERE username = ?', username, (err, row) => {
      if (err) {
        return done(err);
      }
      if (!row) {
        return done(null, false); //Unknown username
      }
      if (!bcrypt.compareSync(password, row.password)) {
        return done(null, false); //Incorrect password
      }
      return done(null, row);
    });

  }));

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {
    db.get('SELECT username FROM users WHERE username = ?', username, function(err, row) {
      if (!row) return done(null, false);
      done(err, row);
    });
  });

};