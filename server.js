/*jshint esversion: 6 */

var express = require('express');
var fs = require('fs');
var passwordHash = require('password-hash');
var _ = require('lodash');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var mongoose = require('mongoose');
var app = express();

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

const FOOBARBOT_ID = "1479481497854175";
var defaultPort = 3000;
var indexHtml = fs.readFileSync(__dirname + globalPath.client.dist + "index.html", "utf8");

app.get('/', function (req, res) { res.send(indexHtml); });
app.use('/js', express.static(__dirname + globalPath.client.dist + "js/"));
app.use('/css', express.static(__dirname + globalPath.client.dist + "css/"));
app.use('/assets', express.static(__dirname + globalPath.client.dist + "assets/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('superSecret', 'supersuperserverserverseecret');


var Schema = mongoose.Schema;
mongoose.connect("mongodb://heroku_6lt22ghm:te2b1dta8i2glj7ss4lk71vjnm@ds037814.mlab.com:37814/heroku_6lt22ghm");

var User = mongoose.model('User', new Schema({
	userId: String,
    userName: String, 
    userEmail: String, 
    userPassword: String,
	userRole: String,
	registrationDate: Number
}));

var Star = mongoose.model('Star', new Schema({
	userId: String, 
    snippetId: String, 
    date: Number
}));

var Snippet = mongoose.model('snippet', new Schema({
	snippetId: String,
	snippetCode: String,
	userId: String,
	tag1: String,
	tag2: String,
	tag3: String,
	readme: String,
	vendor: Boolean
}));

var Notification = mongoose.model('Notification', new Schema({
	userEmail: String, 
    message: String, 
    date: Number 
}));

var apiRoutes = express.Router();

app.use('/api', apiRoutes);

apiRoutes.post('/token/create', function(req, res) {
	User.findOne({userEmail: req.body.userEmail}, function(err, user){
		if (err) {
			res.status(500).send({success: false, message: "Something went wrong"});
			throw err;
		}

		if (user && passwordHash.verify(req.body.userPassword, user.userPassword)) {

			var userToEncode = {
				"userId": user.userId,
				"userEmail": user.userEmail,
				"userName": user.userName
			};

			var token = jwt.sign(userToEncode, app.get('superSecret'), {
				expiresIn : 1440 // 24 hours
			});

			var myUserClient = {
				userToken: token,
				userId: user.userId,
				userEmail: user.userEmail,
				userName: user.userName
			};

			res.json({success: true, message: "Good request", userClient: myUserClient});
		} else {
			res.status(409).send({success: false, message: "User was not found with this e-mail and password"});
		}
	});
});

apiRoutes.post('/token/verify', function(req, res){
	var token = req.body.token || req.query.token || req.headers['x-access-token'];	
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

apiRoutes.get('/user', function(req, res) {
	var myUserId = req.query.userId;
	
	User.findOne({ userId: myUserId}, function(err, user){
		if (user) {
			// if user profile is public
			return res.json({success: true, message: "Good request", user: user});
		} else {
			return res.status(404).send({success: false, message: "No user was found with this Id"});
		}
	});
});

apiRoutes.get('/snippets', function(req, res) {
	var snippetsMaxNumber = req.query.snippetsMaxNumber ? req.query.snippetsMaxNumber : 100;
	var searchText = req.query.searchText ? req.query.searchText : null;

	var options = {};
	if (req.query.userId) {
		options = { userId: req.query.userId };
	} else if (req.query.snippetId) {
		options = { snippetId: req.query.snippetId };
	}

	var mySnippet = new Snippet(req.body.snippet);
	
	Snippet.find(options, function(err, snippets){
		if (snippets) {

			if (searchText !== null) {
				
				snippets = _.shuffle(snippets);
			}

			var snippetsToPass = [];
			for (var i = 0; i < snippetsMaxNumber && i < snippets.length; i++) {
				snippetsToPass.push(snippets[i]);
			}

			return res.json({success: true, message: "You know some shit", snippets: snippetsToPass});
		} else {
			return res.status(404).send({success: false, message: "Snippets were not found with this userId"})
		}
	});
});

apiRoutes.get('/starredsnippets', function(req, res) {
	var snippetsMaxNumber = req.query.snippetsMaxNumber ? req.query.snippetsMaxNumber : 10;
	var myUserId = req.query.userId;
	var snippets = [];
	var myPromises = [];

	Star.find({userId: myUserId}, (err, stars) => {
		
		if (err) throw err;
		for (var i = 0; i < stars.length; i++) {
			
			var myPromise = new Promise((resolve, reject) => {
				Snippet.find({snippetId: stars[i].snippetId}, (err, snippets) => {
					if (err) reject(err);
					resolve(snippets[0]);
				});
			});

			myPromises.push(myPromise);

		}

		Promise.all(myPromises).then(resolvings => {
			return res.json({succes: true, message: "You know some shit", snippets: resolvings});
		}).catch(reason => {
			return res.status(500).send({success: false, message: "Something went wrong... I am so, so sorry..."});
		});
	});
});


apiRoutes.use(function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.body.userToken;

	if (token){
		jwt.verify(token, app.get('superSecret'), function(err, decoded){

			// Failed to authenticate token
			if (err){
				return res.json({success: false, message: 'Failed to authenticate token...'});

			// Succesfull authentication
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({success: false, message: "No token provided."});
	}
});

apiRoutes.post('/foobarbotsnippet', function(req, res) {
	var mySnippet = req.body.snippet;
	var myToken = req.body.token;

	mySnippet.gistId = mySnippet.snippetId;
	mySnippet.gistUrl = mySnippet.snippetUrl;
	mySnippet.gistUserId = mySnippet.userId;
	mySnippet.gistUserUrl = mySnippet.userUrl;
	mySnippet.readme += "\n\nOriginally fetched from [" + mySnippet.gistId + "]("+ mySnippet.gistUrl +")";
	if (mySnippet.userId !== "Unknown") {
		mySnippet.readme += " by [" + mySnippet.gistUserId + "]("+ mySnippet.gistUserUrl +")";
	}

	Snippet.find({gistId: mySnippet.gistId, userId: FOOBARBOT_ID}, function(err, snippets){
		if (err) throw err;

		if (snippets.length == 0) {
			mySnippet.snippetId = String(new Date().getTime())+String(Math.floor(Math.random()*1000));
			mySnippet.userId = FOOBARBOT_ID;
			mySnippet.vendor = false;

			var mySnippetModel = new Snippet(mySnippet);
			
			mySnippetModel.save((err) => {
				if (err) throw err;
				res.json({success: true, snippetId: mySnippet.snippetId});
			});
			
		} else {
			res.status(500).send({success: false, message: "Something went wrong"});
			
		}
	})
})

apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

apiRoutes.get('/notifications', function(req, res) {
	myUserEmail = req.query.userEmail;
	Notification.find({userEmail: myUserEmail}, function(err, notifications) {
		if (err) {
			
			throw err;
		}
		if (notifications){
			res.json(notifications);
			return;
		}
		res.status(409).send({success:false, message: 'no'})
	});
});


apiRoutes.post('/stars', function(req, res) {
	// Define properties
	var userToken = req.body.userToken;
	var snippetId = req.body.snippetId;
	var decoded = jwt.decode(userToken, {complete: true, json: true});
	var userId = decoded.payload.userId;

	// Create object to save
	var myStar = new Star({
		userId: userId,
		snippetId: snippetId,
		date: new Date().getTime()
	});

	// Check if star exists
	Star.findOne({ userId: userId, snippetId: snippetId }, function(err, star) {
		if (star) {
			return res.status(409).send({message: "This user has already starred this snippet"});
		}

		// If star does not exist, save it
		myStar.save(function(err){
			if (err) throw err;
			
			return res.send({success: true});
		});
	});
});


// route to create a new notifications
apiRoutes.post('/notifications', function(req, res) {
	var userEmail = req.body.userEmail;
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

apiRoutes.post('/snippets', function(req, res) {

	var token = req.body.token;
	var decoded = jwt.decode(token, {complete: true, json: true});
	var tempSnippet = req.body.snippet;
	tempSnippet.userId = decoded.payload.userId;
	tempSnippet.snippetId = String(new Date().getTime())+String(Math.floor(Math.random()*1000));
	
	var mySnippet = new Snippet(tempSnippet);

	mySnippet.save((err) => {
		if (err) throw err;

		res.json({success: true});
	});
});

apiRoutes.delete('/notifications', function(req, res) {
	
	var myUserEmail = req.body.userEmail;

	Notification.remove({userEmail: myUserEmail}, (err, notification) => {
		if (err) res.send(err);
		res.json({message: "Succesfully deleted"});
	});
});

apiRoutes.delete('/user', function(req, res) {
	var myToken = req.body.token;

	var decoded = jwt.decode(myToken, {complete: true, json: true});
	var myUserId = decoded.payload.userId;

	User.remove({userId: myUserId}, (err, user) => {
		if (err) res.send(err);

		Notification.remove({userId: myUserId}, (err, notification) => {
			if (err) res.send(err);

			Snippet.remove({userId: myUserId}, (err, snippet) => {
				if (err) res.send(err);

				Star.remove({userId: myUserId}, (err, star) => {
					res.json({message: "User succesfully deleted"});

				})
			})
		})
	});
});

// Start listening on port 5000
app.listen(process.env.PORT || defaultPort, function (data) {
	console.log("Server is listening on ", defaultPort);
});


