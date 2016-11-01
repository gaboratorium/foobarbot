/*jshint esversion: 6 */

// Import modules
var express = require('express');
var fs = require('fs');
var passwordHash = require('password-hash');

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

app.use('/js', express.static(__dirname + globalPath.client.dist + "js/"));
app.use('/css', express.static(__dirname + globalPath.client.dist + "css/"));
app.use('/assets', express.static(__dirname + globalPath.client.dist + "assets/"));

// Prepare to deliver for client, save to RAM
var indexHtml = fs.readFileSync(__dirname + globalPath.client.dist + "index.html", "utf8");

// Serving index
app.get('/', function (req, res) {
  res.send(indexHtml);
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
	userId: String,
    userName: String, 
    userEmail: String, 
    userPassword: String,
	userRole: String,
	registrationDate: Number
}));


// Set a secret
app.set('superSecret', 'supersuperserverserverseecret');

// Set up API routes
var apiRoutes = express.Router();

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

apiRoutes.post('/token/create', function(req, res){


	

	User.findOne({userEmail: req.body.userEmail}, function(err, user){
		if (err) {
			res.status(500).send({success: false, message: "Something went wrong"});
			throw err;
		}

		if (user && passwordHash.verify(req.body.userPassword, user.userPassword)) {

			// Create user object to encode in token
			var userToEncode = {
				"userId": user.userId,
				"userEmail": user.userEmail,
				"userName": user.userName
			};

			// Create token with user object encoded in it
			var token = jwt.sign(userToEncode, app.get('superSecret'), {
				expiresIn : 1440 // 24 hours
			});

			// Create userClient with user object and token
			var myUserClient = {
				userToken: token,
				userId: user.userId,
				userEmail: user.userEmail,
				userName: user.userName
			};

			// Send back token
			res.json({success: true, message: "Good request", userClient: myUserClient});
		}
		else {
			res.status(409).send({success: false, message: "User was not found with this e-mail and password"});
		}
	});
});

apiRoutes.post('/token/verify', function(req, res){
	
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	console.log('token/verify recieves this token:', token);
	

	if (token){
		jwt.verify(token, app.get('superSecret'), function(err, decoded){
			if (err) {
				return res.json({success: false, message: 'Failed to authenticate token...'});
			} else {
				var decodedToken = jwt.verify(token, app.get('superSecret'));
				
				req.decode = req;

				var myUserClient = {
					userToken: token,
					userId: decodedToken.userId,
					userEmail: decodedToken.userEmail,
					userName: decodedToken.userName
				};

				return res.json({success: true, message: 'Token is valid', userClient: myUserClient});
			}
		});
	}
});

// Registration, signup
apiRoutes.post('/users', function(req, res) {
	
	var newObj = {
		userId: String(new Date().getTime())+String(Math.floor(Math.random()*1000)),
		userName : req.body.userName,
		userEmail : req.body.userEmail,
		userPassword : req.body.userPassword,
		userRole: "user",
		registrationDate: new Date().getTime()
	};

	User.findOne({ userEmail: req.body.userEmail }, function(err, user) {
		if (user) {
			return res.status(409).send({message: "E-mail is already taken..."});
		}

		var newUser = new User(newObj);

		newUser.save(function(err){
			if (err) throw err;
			
			return res.send({success: true});
		});
	});
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next){

	
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token){
		jwt.verify(token, app.get('superSecret'), function(err, decoded){

			// Failed to authenticate token
			if (err){
				return res.json({success: false, message: 'Failed to authenticate token...'});

			// Succesfull authentication
			} else {
				req.decoded = decoded;
				console.log('Middleware token verification was succesful');
				next();
			}
		});
	} else {
		console.log('Middleware token verification failed. No token was provided');
		return res.status(403).send({success: false, message: "No token provided."});
	}
});

// apiRoutes.get('/setup', function(req, res) {

	

//   // create a sample user
//   var nick = new User({ 
//     name: 'Nick Cerminara', 
//     password: 'password',
//     admin: true 
//   });

//   // save the sample user
//   nick.save(function(err) {
//     if (err) throw err;

//     console.log('User saved successfully');
//     res.json({ success: true });
//   });
// });


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

var schema = new Schema({
	userEmail: String, 
    message: String, 
    date: Number 
});

var Notification = mongoose.model('Notification', schema);

// route to return all notifications from admin (GET http://localhost:8080/api/users/admin/notifications)
apiRoutes.get('/notifications', function(req, res) {
	console.log('getnotification recieves this query', req.query);
	console.log('getnotification recieves this body', req.body);
	
	myUserEmail = req.query.userEmail;
	Notification.find({userEmail: myUserEmail}, function(err, notifications) {
		if (err) {
			console.log('notification query went wrong');
			
			throw err;
		}
		if (notifications){
			res.json(notifications);
			return;
		}
		res.status(409).send({success:false, message: 'no'})
	});
});
// route to create a new notifications
apiRoutes.post('/notifications', function(req, res) {


	var userEmail = req.body.userEmail;
	console.log('serverjs apiroutes post notification recieves this body', req.body);
	

	
	var notificationMessage = req.body.notificationMessage;

	var myNotification = new Notification({
		userEmail: userEmail,
    	message: notificationMessage, 
    	date: new Date().getTime() 
	});

	myNotification.save((err) => {
		if (err) throw err;


    	res.json({ success: true });
	});
});

apiRoutes.delete('/notifications', function(req, res) {
	console.log('apiroutes delete /notifications recieves body:', req.body);
	
	var myUserEmail = req.body.userEmail;

	Notification.remove({userEmail: myUserEmail}, (err, notification) => {
		if (err) res.send(err);
		res.json({message: "Succesfully deleted"});
	});
});


////////////////////////////////////////////////////
////////////////////////////////////////////////////

// Start listening on port 5000
app.listen(process.env.PORT || defaultPort, function (data) {
  console.log(`Example app listening on port ` + defaultPort);
});

//run the database.js file
// var database = require('./app/server/src/database.js');
