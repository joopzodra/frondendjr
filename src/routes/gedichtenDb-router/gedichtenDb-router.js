const express = require('express');
const gedichtenDb = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const Sequelize = require('sequelize');
const path = require('path');
const setupPassport = require('./setup-passport');
const gedichtenDbAuth = require('./gedichtenDb-auth');
const gedichtenDbManager = require('./gedichtenDb-manager');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const dbPath = path.join(__dirname, 'gedichtenDb.db');
const sequelize = new Sequelize('sqlite:' + dbPath, {logging: false});
const seqStore = new SequelizeStore({
  db: sequelize
});

//sequelize.sync();

const sess = {
  secret: process.env.SESSION_SECRET,
  store: seqStore,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000
  }
};

// For express-session, if app is behind reverse proxy and using ssl (see https://www.npmjs.com/package/express-session#cookiesecure). NB: app.set('trust proxy', 1) is set in app.js
if (process.env.NODE_ENV === 'production') {
  sess.cookie.secure = true;
} 

gedichtenDb.use(bodyParser.json());
gedichtenDb.use(session(sess));
gedichtenDb.use(passport.initialize());
gedichtenDb.use(passport.session());
setupPassport();

gedichtenDb.use('/auth', gedichtenDbAuth);
gedichtenDb.use('/manager', gedichtenDbManager);

module.exports = gedichtenDb;
