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

const sequelize = new Sequelize('sqlite:./src/routes/gedichtenDb-router/gedichtenDb.db');
const User = sequelize.import(path.join(__dirname, 'models/user'));

const seqStore = new SequelizeStore({
    db: sequelize
  });

gedichtenDb.use(bodyParser.json());
gedichtenDb.use(session({
  secret: 'tkKKLOKKD(*&^KI*ue74',
  store: seqStore,
  resave: false,
  saveUninitialized: false,
  //unset: 'destroy'
  //proxy: true
}));

if (gedichtenDb.get('env') === 'production') {
  session.proxy = true;
  gedichtenDb.set('trust proxy', 1); // trust first proxy
  session.cookie.secure = true; // serve secure cookies
}

//seqStore.sync();

gedichtenDb.use(passport.initialize());
gedichtenDb.use(passport.session());
setupPassport();

gedichtenDb.use('/auth', gedichtenDbAuth);
gedichtenDb.use('/manager', gedichtenDbManager);

module.exports = gedichtenDb;
