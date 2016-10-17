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
};

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


////////////////////////////////////////////////////
////////////////////////////////////////////////////
// API and authentication
//body parser to parameters from POST and URL
var bodyParser  = require('body-parser');
// json web token authentication
var jwt    = require('jsonwebtoken');
// log requests to the console
var morgan      = require('morgan');

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Start morgan logweb
app.use(morgan('dev'));

//  Mongoose init
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Connect to db with mongoose
mongoose.connect("mongodb://heroku_6lt22ghm:te2b1dta8i2glj7ss4lk71vjnm@ds037814.mlab.com:37814/heroku_6lt22ghm");



// Set a secret
app.set('superSecret', 'supersuperserverserverseecret');

// Set up API routes
var apiRoutes = express.Router();

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

apiRoutes.get('/setup', function(req, res) {

	// Create mongoose model
	var User = mongoose.model('User', new Schema({ 
	    name: String, 
	    password: String, 
	    admin: Boolean 
	}));

  // create a sample user
  var nick = new User({ 
    name: 'Nick Cerminara', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});


// route to show a random message (GET http://localhost:3000/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});



apiRoutes.get('/test', function(req, res){
	var testObj = { 'name': 'Gabor', 'age': 24 };
	res.setHeader("Content-Type", "application/json");
	testObjAsString = JSON.stringify(testObj);
	res.send(testObjAsString);
})


////////////////////////////////////////////////////
////////////////////////////////////////////////////

// Start listening on port 5000
app.listen(process.env.PORT || defaultPort, function (data) {
  console.log(`Example app listening on port ` + defaultPort);
});

//run the database.js file
// var database = require('./app/server/src/database.js');
