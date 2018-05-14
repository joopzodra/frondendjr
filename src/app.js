const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const fs = require('fs');

const postlist = require('./views/posts/postlist');
const goodReadsRouter = require('./routes/goodreads-router');
const gedichtenDbRouter = require('./routes/gedichtenDb-router/gedichtenDb-router');
const gedichtenDbFragments = require('./routes/gedichtenDb-router/gedichtenDb-fragments');

app.set('port', 8000);
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

/* Routes are used by calls of FrontendJR apps to the backend */
app.use('/goodReads', goodReadsRouter);
app.use('/gedichtenDb', gedichtenDbRouter);

app.get('/', (req, res) => {
  res.render('home', {
    data: postlist
  });
});

app.get(/^(\/\d{4}-\d{2}-\d{2}-.+?)(\/.*)?$/, (req, res, next) => {
  //if url contains a '/' plus more after date+words, take only the part before the '/'
  res.render('posts' + req.params[0], {
    data: postlist
  }, (err, html) => {
    if (err) {
      next();
    } else {
      res.send(html);
    }
  });
});

app.get('/crossdomain.xml', (req, res) => {
  res.sendFile(__dirname + '/crossdomain.xml');
});

app.use('/apps', (req, res, next) => {
  const appDir = req.path.split('/')[1];
  const filePath = path.join(__dirname + '/public/apps', appDir, 'index.html');
  fs.stat(filePath, (err, fileInfo) => {
    if (err) {
      next();
      return;
    }
    if (fileInfo.isFile()) {
      res.sendFile(filePath);
    } else {
      next();
    }
  });
});

app.use((req, res) => {
  res.status(404);
  res.render('404', {
    data: postlist
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.send('Er is helaas een probleem met de server. Probeer het later opnieuw.');
});

const server = app.listen(app.get('port'), () => {
  console.log('listening at port ', app.get('port'));
});

// For gedichtenDb-router: generete poem fragments in cronJob and emit them over a socket
const io = require('socket.io')(server);
gedichtenDbFragments.cronJob.start();
gedichtenDbFragments.emitter.on('fragmentAdded', fragment => io.sockets.emit('poemAdded', fragment));

module.exports = app;
