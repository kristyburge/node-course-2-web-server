const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// register middleware with one function, 3 args(req, res, next). Must be sure to call next() tells Express when middleware is done.
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url}`);

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log file.');
    }
  });
  next();
});

// // set up a maintenance mode middleware so that nothing else will execute
// // because next() is never called
// app.use((req, res, next) => {
//   res.render('maintenance');
// });

// setup middleware to serve public directory
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get("/", function(req, res){
  //res.send('<h1>Hello there Express!</h1><p>You are on the home page.</p>');

  // res.send({
  //   name: "Kristy",
  //   likes: [
  //     'dogs',
  //     'wine'
  //   ]
  // });

  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hi there!! Welcome to my Express website.'
  });

});

app.get('/about', function(req, res){
  //res.send('Welcome to the about page!');
  res.render('about', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', function(req, res){
  res.send({
    errorMessage: 'Error handling your request.'
  });
});

app.get('/projects', function(req, res){
  res.render('projects', {
    pageTitle: 'Projects'
  });
});

app.listen(port, function(){
  console.log(`Starting my Express app on port ${port}...`);
});
