// Imports
var express = require('express');

// Express configuration
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 5000, function (data) {
  console.log(`Example app listening!`);
});