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

// Create mongoose model
var User = mongoose.model('User', new Schema({ 
    name: String, 
    password: String, 
    admin: Boolean 
}));


// Set a secret
app.set('superSecret', 'supersuperserverserverseecret');

// Set up API routes
var apiRoutes = express.Router();

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

apiRoutes.post('/token/create', function(req, res){

	// Hard coded user
	var expectedUser = "admin";
	var expectedPassword = "admin";

	console.log(req.body.name);
	console.log(req.body.password);

	// Succesful login
	if (req.body.name == expectedUser && req.body.password == expectedPassword) {

		// Create user object
		var user = {
			"name": "admin"
		}

		// Create token
		var token = jwt.sign(user, app.get('superSecret'), {
			expiresIn : 1440 // 24 hours
		});

		var userToSend = {
			name: user.name,
			token: token
		}

		// Send back token
		res.json({success: true, message: "Good request", user: userToSend})

	// Unsuccesful login - error msg
	} else {
		res.status(400).json({success: false, message: "Bad request, user name or password was not received or was invalid"})
	}
})

apiRoutes.post('/token/verify', function(req, res){
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token){
		jww.verify(token, app.get('superSecret'), function(err, decoded){
			if (err) {
				return res.json({success: false, message: 'Failed to authenticate token...'})
			} else {
				req.decode = req
				return res.json({success: true, message: 'Token is valid'})
			}
		})
	}
})

// route middleware to verify a token
apiRoutes.use(function(req, res, next){

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token){
		jwt.verify(token, app.get('superSecret'), function(err, decoded){

			// Failed to authenticate token
			if (err){
				return res.json({success: false, message: 'Failed to authenticate token...'})

			// Succesfull authentication
			} else {
				req.decoded = decoded;
				next();
			}
		})
	} else {
		return res.status(403).send({success: false, message: "No token provided."})
	}
})

apiRoutes.get('/setup', function(req, res) {

	

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



apiRoutes.get('/gabor', function(req, res){
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
