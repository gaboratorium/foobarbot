// Imports
var express = require('express');
var fs = require('fs');

// Express configuration
var app = express();

// Load index.html
var indexHtml = fs.readFileSync(__dirname + "/public/index.html", "utf8");

app.get('/', function (req, res) {
  res.send(indexHtml);
});

app.listen(process.env.PORT || 5000, function (data) {
  console.log(`Example app listening!`);
});