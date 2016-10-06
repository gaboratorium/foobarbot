// Import modules
var express = require('express');
var fs = require('fs');

// Init express app
var app = express();

// Load index and dependencies, write them to RAM
var indexHtml = fs.readFileSync(__dirname + "/client/dist/index.html", "utf8");
var libsJs = fs.readFileSync(__dirname + "/client/dist/js/libs.js", "utf8");
var appJs = fs.readFileSync(__dirname + "/client/dist/js/app.js", "utf8");

// Serving Angular
app.get('/', function (req, res) {
  res.send(indexHtml);
});

// Serving Angular
app.get('/js/libs.js', function (req, res) {
  res.send(libsJs);
});
app.get('/js/app.js', function (req, res) {
  res.send(libsJs);
});

// Start listening on port 5000
app.listen(process.env.PORT || 5000, function (data) {
  console.log(`Example app listening!`);
});


