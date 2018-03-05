const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('user', {
    username: {
      type: DataTypes.TEXT,
      validate: {
        len: [4, 15],
        isAlphanumeric: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      validate: {
        len: [4, 15],
        not: ['[ ]']
      }

    }
  });

  User.beforeCreate(user => {
    return bcrypt.hash(user.password, saltRounds)
      .then(hashedPassword => {
        user.password = hashedPassword;
      })
      .catch(err => {
        done(err);
      });
  });

  User.prototype.verifyPassword = function(guess, done) {
    return bcrypt.compare(guess, this.password)
      .then(isMatch => {
        done(null, isMatch);
      })
      .catch(err => {
        done(err);
      });
  };

  return User;
};