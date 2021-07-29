var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'));

const fs = require('fs'); 

var data = [];

fs.readdirSync('public/assets/img/works').forEach(file => { 
  image = file.split("_");
  data.push({ type: image[1].split(".")[0], id: image[0], path: file})
}); 

data.sort(() => Math.random() - 0.5);
console.log(data);

var map = require('./database.js').map

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index', {
    data: data,
    map: map
  });
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

// works page
app.get('/works', function(req, res) {
  res.render('pages/works', {
    data: data,
    map: map
  });
});

// contact page
app.get('/contact', function(req, res) {
  res.render('pages/contact');
});

// work-single page
app.get('/work/:type/:id', function(req, res) {
  image = req.params
  image.path = `${ req.params.id }_${ req.params.type }.jpg`
  res.render('pages/work', {
    image: image,
    info: map.get(image.path)
  });
});

app.listen(1337, () => {
  console.log("The server is up and running!");
});