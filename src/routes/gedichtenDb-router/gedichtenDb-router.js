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
const sequelize = new Sequelize('sqlite:' + dbPath);
const User = sequelize.import(path.join(__dirname, 'models/user'));
const seqStore = new SequelizeStore({
  db: sequelize
});
//seqStore.sync(); // Only when using a new DB. Sequelize sync method syncs all defined models to the DB. In this case a new table Session will be added to the DB.
//User.sync();

const sess = {
  secret: 'tkKKLOKKD(*&^KI*ue74', //TODO: via environment var
  store: seqStore,
  resave: false,
  saveUninitialized: false,
  cookie: {}
};

// for express-session if app is behind reverse proxy and using ssl (see https://www.npmjs.com/package/express-session#cookiesecure)
gedichtenDb.use(function(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    req.app.set('trust proxy', 1);
    sess.cookie.secure = true;
  }
  //console.log('protocol:', req.protocol); //nginx is configured with: proxy_set_header X-Forwarded-Proto $scheme; So the req.protocol should be https
  next();
});

gedichtenDb.use(bodyParser.json());
gedichtenDb.use(session(sess));
gedichtenDb.use(function(req, res, next) {
  console.log(req.session, req.sessionID)
  next();
})
gedichtenDb.use(passport.initialize());
gedichtenDb.use(passport.session());
setupPassport();

gedichtenDb.use('/auth', gedichtenDbAuth);
gedichtenDb.use('/manager', gedichtenDbManager);

module.exports = gedichtenDb;