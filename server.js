/*jshint esversion: 6 */

// Import modules
var express = require('express');
var fs = require('fs');

// Init express app
var app = express();

// Define globalPaths
var globalPath = {
	"client": {
		"root": "/app/client/",
		"src": "/app/client/src/",
		"dist": "/app/client/dist/",
	},
	"server": {
		"root": "/server/"
	}
}

var defaultPort = 3000;

// Prepare to deliver for client, save to RAM
var indexHtml = fs.readFileSync(__dirname + globalPath.client.dist + "index.html", "utf8");
var libsJs = fs.readFileSync(__dirname + globalPath.client.dist + "js/libs.js", "utf8");
var appJs = fs.readFileSync(__dirname + globalPath.client.dist + "js/app.js", "utf8");
var appCss = fs.readFileSync(__dirname + globalPath.client.dist + "css/app.css", "utf8");
var libsCss = fs.readFileSync(__dirname + globalPath.client.dist + "css/libs.css", "utf8");

// Serving index
app.get('/', function (req, res) {
  res.send(indexHtml);
});

// Serving vendor and app css and js
app.get('/js/libs.js', function (req, res) {
  res.send(libsJs);
});
app.get('/js/app.js', function (req, res) {
  res.send(appJs);
});

app.get('/css/app.css', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(appCss);
    res.end();
});
app.get('/css/libs.css', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(libsCss);
    res.end();
});

// Start listening on port 5000
app.listen(process.env.PORT || defaultPort, function (data) {
  console.log(`Example app listening on port ` + defaultPort);
});

//run the database.js file
var database = require('./app/server/src/database.js');
