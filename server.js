const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 80;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var start = new Date();
  var log = `${now}: ${req.method} ${req.url} ${Date.now() - start}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance', { name: 'marcus' });
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //   res.send('<h1>Hello Express!</h1>');
  // res.send({ name: 'Marcus', likes: ['Biking', 'Cookings'] });
  res.render('home', {
    pageTitle: ' Home Page Test',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about', {
    pageTitle: 'About Page Test',
    currentYear: new Date().getFullYear()
  });
});

// bad - send back json with errMsg
app.get('/bad', (req, res) => {
  res.send({
    errMsgL: 'Unable to handle request!'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
