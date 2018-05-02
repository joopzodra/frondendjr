const path = require('path');
const dbPath = path.join(__dirname, 'gedichtenDb.db');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:' + dbPath);
const Poet = sequelize.import(path.join(__dirname, 'models/poet'));
const fs = require('fs');
const uploadDir = path.join(__dirname, '../../public/uploads/gedichtenDb');

module.exports = {
  insertUserData: (userId) => {

    setTimeout(deleteUserData, 86400000 + 60000); //one day plus one minute

    const adminUserId = 49;
    const queryPoems = `INSERT INTO poems (title, text, text_lines, poet_id, bundle_id, url, url_label, comment, user_id, createdAt, updatedAt) SELECT title, text, ${0}, poet_id, bundle_id, url, url_label, comment, ${userId}, datetime('now'), datetime('now') FROM poems WHERE user_id=${adminUserId}`;
    const queryPoets = `INSERT INTO poets SELECT id, name, born, died, ${userId}, null, datetime('now'), datetime('now'), img_url FROM poets WHERE user_id=${adminUserId}`;
    const queryBundles = `INSERT INTO bundles SELECT id, title, poet_id, year, ${userId}, null, datetime('now'), datetime('now') FROM bundles WHERE user_id=${adminUserId}`;

    return sequelize.transaction(function(t) {
      return Promise.all([
        sequelize.query(queryPoems, {
          type: sequelize.QueryTypes.INSERT,
          transaction: t
        }),
        sequelize.query(queryPoets, {
          type: sequelize.QueryTypes.INSERT,
          transaction: t
        }),
        sequelize.query(queryBundles, {
          type: sequelize.QueryTypes.INSERT,
          transaction: t
        })
        ]);      
    })
    .then(() => {
      return Poet.findAll({where: {user_id : userId}})
      .then(poets => {
        return Promise.all(poets.map(poet => {
          if (poet.img_url) {
            const itemId = poet.getDataValue('item_id');
            const imgExt = '.' + poet.getDataValue('img_url').split('.').pop();
            poet.set('img_url', itemId + imgExt);            
            const nameToGet = poet.getDataValue('id');
            const nameToSet = poet.getDataValue('item_id');
            return poet.save()
            .then(() => {
              return fs.copyFile(uploadDir +  '/' + nameToGet + imgExt, uploadDir + '/' + nameToSet + imgExt, (err) => {
                if(err) return err;
                return;
              });
            });
          } else {
            return poet;
          }
        }));
      })
      .catch(err => console.log(err));
    });
  },
};

const deleteUserData = () => {
  const queryPoems = `DELETE FROM poems WHERE user_id!=49 AND createdAt < datetime('now', '-24 hours')`;
  const queryPoets = `DELETE FROM poets WHERE user_id!=49 AND createdAt < datetime('now', '-24 hours')`;
  const queryBundles = `DELETE FROM bundles WHERE user_id!=49 AND createdAt < datetime('now', '-24 hours')`;
  const queryUsers = `DELETE FROM users WHERE id!=49 AND createdAt < datetime('now', '-24 hours')`;

  return sequelize.transaction(function(t) {
    return Promise.all([
      sequelize.query(queryPoems, {
        type: sequelize.QueryTypes.DELETE,
        transaction: t
      }),
      sequelize.query(queryPoets, {
        type: sequelize.QueryTypes.DELETE,
        transaction: t
      }),
      sequelize.query(queryBundles, {
        type: sequelize.QueryTypes.DELETE,
        transaction: t
      }),
      sequelize.query(queryUsers, {
        type: sequelize.QueryTypes.DELETE,
        transaction: t
      })
      ]);
  });
};
