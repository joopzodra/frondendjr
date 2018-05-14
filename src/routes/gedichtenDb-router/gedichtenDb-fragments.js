const cronJob = require('cron').CronJob;
const path = require('path');
const arrayWrap = require('arraywrap');
const Sequelize = require('sequelize');
const dbPath = path.join(__dirname, 'gedichtenDb.db');
const sequelize = new Sequelize('sqlite:' + dbPath, {logging: false});
const Poem = sequelize.import(path.join(__dirname, 'models/poem'));
const Poet = sequelize.import(path.join(__dirname, 'models/poet'));
const Bundle = sequelize.import(path.join(__dirname, 'models/bundle'));
const Fragment = sequelize.import(path.join(__dirname, 'models/fragment'));
const express = require('express');
const gedichtenDbFragments = express.Router();

const events = require('events');
const emitter = new events.EventEmitter();

// export an object for app.js, where the object becomes: const gedichtenDbFragments
module.exports = {
  cronJob: new cronJob('00,20,40 * * * * *', emitFragment),
  emitter: emitter,
  fragmentsRouter: gedichtenDbFragments 
};

gedichtenDbFragments.get('/', (req, res, next) => {
  const offset =  +arrayWrap(req.query.offset || '0')[0];
  let limit = +arrayWrap(req.query.limit || '5')[0];

  const findAll = Fragment.count().then(count => {
    // some computing because we want offset starting from the last, most recent, row
    let bottomOffset = count - offset - limit;
    if (bottomOffset <= 0) {
      limit = limit + bottomOffset;
      bottomOffset = 0;
    }
    return Fragment.findAll({offset: bottomOffset, limit: limit});
  });

  const rowsCount = Fragment.count();
  Promise.all([findAll, rowsCount])
  .then(([fragments, count]) => {
    const completed = (offset + limit) >= count;
    res.json({poems: fragments.reverse(), completed: completed});
  })
  .catch(err => {
    next(err);
  });
});

gedichtenDbFragments.use((err, req, res, next) => {
 console.log(err); 
 res.status(500);
 res.send('Er is helaas een probleem met de server. Probeer het later opnieuw.');
});

Poet.hasMany(Poem, {foreignKey: 'poet_id'});
Poem.belongsTo(Poet, {foreignKey: 'poet_id', targetKey: 'id'});
Poem.belongsTo(Bundle, {foreignKey: 'bundle_id', targetKey: 'id'});

function emitFragment() {
  getFragment()
  .then(fragment => emitter.emit('fragmentAdded', fragment))
  .then(limitTable)
  .catch(err => console.log(err));
}

function getFragment() {
  return Poem.findAll({
    where: { user_id: 49 }
  })
  .then(poems => Promise.all(poems.map(poem => Array(poem.text_lines).fill(poem.id))))
  .then(arrayOfPoemIdArrays => {
    const list = [];
    arrayOfPoemIdArrays.forEach(arr => list.push(...arr));
    const randomIndex = Math.round(Math.random()*(list.length - 1));
    const poemId = list[randomIndex];
    return Poem.findById(poemId, { include: [Poet, Bundle]}); 
  })
  .then(poem => {
    const poemLines = poem.text.split('\n');
    const withoutWhiteLines = poemLines.filter(line => line !== '' && line !== ' ');
    const possibleStartLines = withoutWhiteLines.length - 4;
    const startLine = Math.round(Math.random() * possibleStartLines);
    const fragment = withoutWhiteLines.slice(startLine, startLine + 4).join('\n');
    return Fragment.create({
      fragment: fragment,
      poet: poem.poet.name,
      poet_img: poem.poet.img_url,
      source_url_label: poem.url_label,
      source_url: poem.url,
      time: convertDateTime(new Date())
    });
  })
  .catch(err => console.log(err));
}

function limitTable() {
  const limit = 35;
  return Fragment.count()
  .then(count => {
    if (count <= limit) {
      return Promise.resolve();
    } else {
      return Fragment.destroy({where:{},limit: 1}).then(() => limitTable());
    }
  });  
}

function convertDateTime(dateTime) {
  const monthes = ['jan', 'feb', 'mrt', 'apr', 'mei', 'juni', 'juli', 'aug', 'sept', 'okt', 'nov', 'dec'];
  const day = dateTime.getDate();
  const monthIndex = dateTime.getMonth();
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours();
  let minutes = dateTime.getMinutes();
  minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
  return `${day} ${monthes[monthIndex]} ${year}, ${hour}.${minutes} uur`;
}
