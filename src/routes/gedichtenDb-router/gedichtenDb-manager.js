const express = require('express');
const Sequelize = require('sequelize');
const gedichtenDbManager = express.Router();
const path = require('path');
const arrayWrap = require('arraywrap');
const dbPath = path.join(__dirname, 'gedichtenDb.db');
const sequelize = new Sequelize('sqlite:' + dbPath);
const Poem = sequelize.import(path.join(__dirname, 'models/poem'));
const Poet = sequelize.import(path.join(__dirname, 'models/poet'));
const Bundle = sequelize.import(path.join(__dirname, 'models/bundle'));
const Op = Sequelize.Op;
const multer  = require('multer');
const uploadDir = path.join(__dirname, '../../public/uploads/gedichtenDb');
const upload = multer({ dest: uploadDir });
const fs = require('fs');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    res.json({
      type: 'unauthorized user'
    });
  }
}

function renamePoetImg(imgUrl, item, file, affectedCount) {
  // If item, it's a new item, and POST/create returns an item. Else, it's an updated item and PUT/update return the number of affected database-table-rows (as a number in an array). Item is needed in frontend; affectedCount is only for dev check.
  const resolveValue = item ? item: affectedCount;
  if (!file) {
    return Promise.resolve(resolveValue);
  }
  const fileExt = getFileExt(file.mimetype);
  const url = imgUrl ? imgUrl : item.item_id + fileExt;
  const fileName = file.filename;
  return new Promise((resolve) => {
    fs.rename(path.join(uploadDir, fileName), path.join(uploadDir, url), (err) => {
      if (err) {
        console.log(err);
        resolve(resolveValue);
      } else {
        resolve(resolveValue);
      }
    });
  });
}

function getFileExt(mimetype) {
  let fileExt;
  if (mimetype === 'image/jpeg') {
    fileExt = '.jpg';
  }
  if (mimetype === 'image/png') {
    fileExt = '.png';
  }
  return fileExt;
}

function checkFile(req) {
  if (!(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') || req.file.size > 24576) {
    deletePoetImg(req.file.filename, undefined);
    req.file = undefined;
  }
}

function deletePoetImg(imgUrl, tableRows) {
  // tableRows is the return value of Poet.delete; we just pass it on.
  if (!imgUrl) {
    return Promise.resolve(tableRows);
  }
  const filePath = path.join(uploadDir, imgUrl);
  return new Promise((resolve) => {
    fs.unlink(filePath, err => {
      if (err) {
        console.log(err);
        resolve(tableRows);
        //reject(err);
      } else {
        resolve(tableRows);
      }
    });
  });
}

gedichtenDbManager.get('/find-all', ensureAuthenticated, (req, res, next) => {
  const userId = req.user.id || 0;
  const queryString = arrayWrap(req.query.queryString || '')[0].trim();
  const table =  arrayWrap(req.query.table || '')[0];
  const column = arrayWrap(req.query.column || '')[0];
  const offset = arrayWrap(+req.query.offset || 0)[0];
  const maxItems = arrayWrap(+req.query.maxItems || 10)[0];
  let query;
  switch (table) {
    case 'poems':
    query = `
    SELECT poems.id, poems.poet_id, poems.bundle_id, poems.title, poems.text, poems.url, poems.url_label, poems.comment, poets.name AS poet_name, bundles.title AS 'bundle_title'
    FROM poems
    LEFT OUTER JOIN poets ON poets.user_id = ${userId} AND poems.poet_id = poets.id
    LEFT OUTER JOIN bundles ON bundles.user_id = ${userId} AND poems.bundle_id = bundles.id
    WHERE poems.user_id = ${userId} AND 
    CASE 
    WHEN $liketerm != '%%' THEN ${column} LIKE $liketerm 
    ELSE ${column} LIKE $liketerm OR ${column} IS NULL 
    END
    ORDER BY poets.name, poems.text
    LIMIT ${maxItems} OFFSET ${offset}`;
    break;
    case 'poets':
    query = `SELECT poets.id, poets.name, poets.born, poets.died, poets.item_id, poets.img_url FROM poets WHERE poets.user_id = ${userId} AND poets.name LIKE $liketerm
    ORDER BY poets.name
    LIMIT ${maxItems} OFFSET ${offset}`;
    break;
    case 'bundles':
    query = `SELECT bundles.id, bundles.poet_id, bundles.year, bundles.title, poets.name AS poet_name
    FROM bundles
    LEFT OUTER JOIN poets ON poets.user_id = ${userId} AND bundles.poet_id = poets.id
    WHERE bundles.user_id = ${userId} AND ${column} LIKE $liketerm
    ORDER BY poets.name, bundles.title
    LIMIT ${maxItems} OFFSET ${offset}`;
    break;
  }
  sequelize.query(query, {bind: {liketerm: `%${queryString}%`}, type: sequelize.QueryTypes.SELECT})
  .then(tableRows => res.json(tableRows))
  .catch(err => next(err));
});

// Simple example of Sequelize findAll, showing that queries with AND/OR quickly become complex. Therefore here above raw SQL queries.
/*  Poem.findAll({
    attributes: {
      exclude: ['user_id']
    },
    where: {
      [Op.and]: [{
        [Op.or]: [{
          title: {
            [Op.like]: '%' + query + '%'
          }
        }, {
          text: {
            [Op.like]: '%' + query + '%'
          }
        }]
      }, {
        user_id: req.user.id
      }]
    }
  })
  .then(poems => res.json(poems))
  .catch(err => next(err));*/


  gedichtenDbManager.get('/find-by-id', ensureAuthenticated, (req, res, next) => {
    const userId = req.user.id || 0;
    const table =  arrayWrap(req.query.table || '')[0];
    const itemId =  arrayWrap(req.query.itemId || 0)[0];
    let query;

    switch (table) {
      case 'poems':
      query = `
      SELECT poems.id, poems.poet_id, poems.bundle_id, poems.title, poems.text, poems.url, poems.url_label, poems.comment, poets.name AS poet_name, bundles.title AS 'bundle_title'
      FROM poems
      LEFT OUTER JOIN poets ON poets.user_id = ${userId} AND poems.poet_id = poets.id
      LEFT OUTER JOIN bundles ON bundles.user_id = ${userId} AND poems.bundle_id = bundles.id
      WHERE poems.user_id = ${userId} 
      AND poems.id = ${itemId}`;
      break;
      case 'poets':
      query = `SELECT poets.id, poets.name, poets.born, poets.died, poets.item_id, poets.img_url FROM poets
      WHERE poets.id = ${itemId}`;
      break;
      case 'bundles':
      query = `SELECT bundles.id, bundles.poet_id, bundles.year, bundles.title, poets.name AS poet_name
      FROM bundles
      LEFT OUTER JOIN poets ON poets.user_id = ${userId} AND bundles.poet_id = poets.id
      WHERE bundles.user_id = ${userId} 
      AND bundles.id = ${itemId}`;
      break;
    }
    sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
    .then(tableRow => res.json(tableRow[0]))
    .catch(err => next(err));
  });

  // If the formdata contains an image, it is bind to req.file. This is done by the multer package. The function upload.single() is a multer function.
  gedichtenDbManager.post('/create', ensureAuthenticated, upload.single('img'), (req, res, next) => {
    const userId = req.user.id || 0;
    const table =  arrayWrap(req.query.table || '')[0];
    const json = req.body;
    const imgExt = req.file ? getFileExt(req.file.mimetype) : null;
    const createItem = () => {
      switch(table) {
        case 'poems':
        return Poem.create({
          title: json.title,
          text: json.text,
          poet_id: json.poet_id,
          bundle_id: json.bundle_id,
          url: json.url,
          url_label: json.url_label,
          comment: json.comment,
          user_id: userId
        });
        case 'poets':
        return Poet.max('id').then(maxId => {
          maxId = maxId || 0;
          return Poet.create({
            id: maxId + 1,
            name: json.name,
            born: json.born,
            died: json.died,
            user_id: userId,
            img_url: imgExt ? imgExt : ''
          });          
        })
        .then(createdItem => renamePoetImg(undefined, createdItem, req.file))
        .then(createdItem => {
          if (req.file) {
            const imgUrl = createdItem.getDataValue('item_id') + imgExt;
            createdItem.set('img_url', imgUrl);
            return createdItem.save();            
          } else {
            return createdItem;
          }
        });
        case 'bundles':
        return Bundle.max('id').then(maxId => {
          maxId = maxId || 0;
          return Bundle.create({
            id: maxId + 1,
            title: json.title,
            poet_id: json.poet_id,
            year: json.year,
            user_id: userId
          });          
        });
      }
    };
    createItem()
    .then(createdItem => res.json(createdItem))
    .catch(err => next(err));
  });

  // If the formdata contains an image, it is bind to req.file. This is done by the multer package. The function upload.single() is a multer function.
  gedichtenDbManager.put('/update', ensureAuthenticated, upload.single('img'), (req, res, next) => {
    const userId = req.user.id || 0;
    const table =  arrayWrap(req.query.table || '')[0];
    const json = req.body;
    if (req.file) {
      checkFile(req);
    }
    const imgExt = req.file ? getFileExt(req.file.mimetype) : null;
    // Note: json.img_url is current url. If we get a new file, we must update the filename, otherwise the browser cache will still show the previous image. If we don't get a file, we store the existing url again in the database.
    let imgUrl;
    if (req.file) {
      imgUrl = json.item_id + '-' + Date.now().toString() + imgExt;
    } else if (json.delete_poet_img) {
      imgUrl = '';
    } else {
      imgUrl = json.img_url;
    }

    const updateItem = () => {
      switch(table) {
        case 'poems':
        return Poem.update({
          title: json.title,
          text: json.text,
          poet_id: json.poet_id,
          bundle_id: json.bundle_id,
          url: json.url,
          url_label: json.url_label,
          comment: json.comment
        }, {
          where: {
            [Op.and]: [{id: json.id}, {user_id: userId}]
          }
        });
        case 'poets':
        return Poet.update({
          name: json.name,
          born: json.born,
          died: json.died,
          img_url: imgUrl
        }, {
          where: {
            [Op.and]: [{id: json.id}, {user_id: userId}]
          }
        })
        .then(affectedCount => {
          if (req.file || json.delete_poet_img) {
            return deletePoetImg(json.img_url)
            .then(() => renamePoetImg(imgUrl, undefined, req.file, affectedCount));
          }
          return affectedCount;
        })
        .then(affectedCount => ({affectedCount: affectedCount, imgUrl: imgUrl}));
        case 'bundles':
        return Bundle.update({
          title: json.title,
          poet_id: json.poet_id,
          year: json.year
        }, {
          where: {
            [Op.and]: [{id: json.id}, {user_id: userId}]
          }
        });
      }
    };
    updateItem()
    .then(result => res.json(result))
    .catch(err => next(err));
  });

  gedichtenDbManager.delete('/delete', ensureAuthenticated, (req, res, next) => {
    const userId = req.user.id || 0;
    const table =  arrayWrap(req.query.table || '')[0];
    const id = arrayWrap(req.query.id || '')[0];
    const imgUrl = arrayWrap(req.query.imgUrl || '')[0];
    const destroyItem = () => { 
      switch(table) {
        case 'poems':
        return Poem.destroy({
          where: {
            [Op.and]: [{id: id}, {user_id: userId}]
          }
        });
        case 'poets':
        return Poet.destroy({
          where: {
            [Op.and]: [{id: id}, {user_id: userId}]
          }
        })
        .then(tableRows => deletePoetImg(imgUrl, tableRows));
        case 'bundles':
        return Bundle.destroy({
          where: {
            [Op.and]: [{id: id}, {user_id: userId}]
          }
        });
      }
    };
    destroyItem()
    .then(tableRows => res.json(tableRows))
    .catch(err => next(err));
  });

  gedichtenDbManager.get('/find-children', ensureAuthenticated, (req, res, next) => {
    const userId = req.user.id || 0;
    const table =  arrayWrap(req.query.table || '')[0];
    const query = arrayWrap(req.query.queryString || '')[0].trim();
    const findChildren = () => {
      switch(table) {
        case 'poets':
        return Poet.findAll({
          limit: 15,
          attributes: {
            exclude: ['user_id', 'createdAt', 'updatedAt']
          },
          where: {
            [Op.and]: [{
              name: {
                [Op.like]: '%' + query + '%'
              }
            }, {
              user_id: userId
            }]
          }
        });
        case 'bundles':
        return Bundle.findAll({
          limit: 15,
          attributes: {
            exclude: ['user_id', 'createdAt', 'updatedAt']
          },
          where: {
            [Op.and]: [{
              title: {
                [Op.like]: '%' + query + '%'
              }
            }, {
              user_id: userId
            }]
          }
        });
      }
    };
    findChildren()
    .then(children => res.json(children))
    .catch(err => next(err));
  });

  gedichtenDbManager.get('/find-child-by-id', ensureAuthenticated, (req, res, next) => {
    const table =  arrayWrap(req.query.table || '')[0];
    const id = arrayWrap(req.query.id || '')[0];
    const findOne = () => {
      switch(table) {
        case 'poets':
        return Poet.findOne({
          attributes: {
            exclude: ['user_id', 'createdAt', 'updatedAt']
          },
          where: {
            id: id
          }
        });
        case 'bundles':
        return Bundle.findOne({
          attributes: {
            exclude: ['user_id','createdAt', 'updatedAt']
          },
          where: {
            id: id
          }
        });
      }
    };
    findOne()
    .then(child => res.json(child))
    .catch(err => next(err));
  });

  gedichtenDbManager.use((err, req, res) => {
   console.log(err); 
   if (err.name === 'SequelizeValidationError') {
    res.status(400);
    res.send('Invalid data from user');
  } else {
    res.status(500);
    res.send('Er is helaas een probleem met de server. Probeer het later opnieuw.');
  }
});

  module.exports = gedichtenDbManager;
