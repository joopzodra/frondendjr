const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');
const helmet = require('helmet');
const favicon = require('serve-favicon');

const postlist = require('./views/posts/postlist');
const goodReadsRouter = require('./routes/goodreads-router');
const iframeContentPath = path.resolve(__dirname, 'public/apps');

app.set('port', process.env.PORT || 8000);
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/goodReads', goodReadsRouter);

app.get('/', (req, res) => {
   res.render('home', {
    data: postlist
  });
});

app.get(/^(\/\d{4}-\d{2}-\d{2}-.+?)(\/.*)?$/, (req, res, next) => {
  //if url contains a '/' plus more after date+words, take only the part before the '/'
  res.render('posts' + req.params[0], {data: postlist}, (err, html) => {
    if(err) {
      next();
    } else {
      res.send(html);
    }
  });
});

app.use('/iframe-content', express.static(iframeContentPath));

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
  res.render('home', {
    data: postlist
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.send('Er is helaas een probleem met de server. Probeer het later opnieuw.');
});

app.listen(app.get('port'), () => {
});

module.exports = app;
