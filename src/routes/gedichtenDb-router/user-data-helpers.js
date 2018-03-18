const path = require('path');
const dbPath = path.join(__dirname, 'gedichtenDb.db');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:' + dbPath);
const CronJob = require('cron').CronJob;

module.exports = {
  insertUserData: (userId) => {

    const adminUserId = 49;
    const queryPoems = `INSERT INTO poems (title, text, text_lines, poet_id, bundle_id, url, url_label, comment, user_id, createdAt, updatedAt) SELECT title, text, ${0}, poet_id, bundle_id, url, url_label, comment, ${userId}, datetime('now'), datetime('now') FROM poems WHERE user_id=${adminUserId}`;
    const queryPoets = `INSERT INTO poets SELECT id, name, born, died, ${userId}, null, datetime('now'), datetime('now') FROM poets WHERE user_id=${adminUserId}`;
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
    });
  },

  deleteUserData: () => {
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
  }
};