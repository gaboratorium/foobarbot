// Import modules
var express = require('express');
var fs = require('fs');

// Init express app
var app = express();

//mongoose init
var mongoose = require('mongoose');
//mlab connection URI (can be seen in "$ heroku config")
var mongodbUri = "mongodb://heroku_6lt22ghm:te2b1dta8i2glj7ss4lk71vjnm@ds037814.mlab.com:37814/heroku_6lt22ghm";
//if we want to connect to another database, we have to change the mongodbUri (eg: dev and live database detection)


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

// Prepare to deliver for client, save to RAM
var indexHtml = fs.readFileSync(__dirname + globalPath.client.dist + "index.html", "utf8");
var libsJs = fs.readFileSync(__dirname + globalPath.client.dist + "js/libs.js", "utf8");
var appJs = fs.readFileSync(__dirname + globalPath.client.dist + "js/app.js", "utf8");

// Serving Angular
app.get('/', function (req, res) {
  res.send(indexHtml);
});

// Serving Angular
app.get('/js/libs.js', function (req, res) {
  res.send(libsJs);
});
app.get('/js/app.js', function (req, res) {
  res.send(appJs);
});

// Start listening on port 3000
app.listen(process.env.PORT || 3000, function (data) {
  console.log(`Example app listening!`);
});

//----------------------------------------------------------------------------//
//----------------------------Database stuff----------------------------------//

//no idea yet, but one warning message disappears
mongoose.Promise = global.Promise;

// connecting to mongoose database
mongoose.connect(mongodbUri);

//connection
var db = mongoose.connection;

// general schema
var Schema = mongoose.Schema;

//error on connecting
db.on('error', console.error.bind(console, 'connection error:'));
//if we can connect
db.once('open', function() {
  console.log("mLab Database Connected");
	testQuery();
});

//db.once is async, so I had to include everything in a function for now 
function testQuery() {
	//creating a schema/template (setting the columns and types)
	var testSchema = new Schema({
		name:  String,
		value: Number
	});
	//setting a model structure. database name will ALWAYS be the lower-case version +s of the first parameter, second is the entry template
	// database name will be "kiskutyas"
	var Test = mongoose.model('kiskutya', testSchema);
	//new database entry
	var test1 = new Test({
		name: "hello world",
		value: 14
  });
	//save a variable to the database
	test1.save();

	// this is the query that is searching
	var query = Test.find({value: {$gte:10}});

	query.exec(function(err, results){
		//is there's an error, we throw error
		if(err) return console.log("error");
		//return the results we found
		console.log(results);

	});	

}

