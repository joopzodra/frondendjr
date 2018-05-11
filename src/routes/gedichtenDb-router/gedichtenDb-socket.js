const cronJob = require('cron').CronJob;
const path = require('path');
const Sequelize = require('sequelize');
const dbPath = path.join(__dirname, 'gedichtenDb.db');
const sequelize = new Sequelize('sqlite:' + dbPath, {logging: false});
const Poem = sequelize.import(path.join(__dirname, 'models/poem'));
const Poet = sequelize.import(path.join(__dirname, 'models/poet'));
const Bundle = sequelize.import(path.join(__dirname, 'models/bundle'));
const Fragment = sequelize.import(path.join(__dirname, 'models/fragment'));

const events = require('events');
const emitter = new events.EventEmitter();

Poet.hasMany(Poem, {foreignKey: 'poet_id'});
Poem.belongsTo(Poet, {foreignKey: 'poet_id', targetKey: 'id'});
Poem.belongsTo(Bundle, {foreignKey: 'bundle_id', targetKey: 'id'});

module.exports = (io) => {
  new cronJob('00,20,40 * * * * *', emitFragment, null, true);
  io.on('connection', socket => {
    Fragment.findAll()
    .then(poems => socket.emit('connected', poems));
  });  
  emitter.on('fragmentAdded', fragment => io.sockets.emit('poemAdded', fragment));
};

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
  const limit = 10;
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
  minutes = minutes.length === 1 ? '0' + minutes : minutes
  return `${day} ${monthes[monthIndex]} ${year}, ${hour}.${minutes} uur`;
}
