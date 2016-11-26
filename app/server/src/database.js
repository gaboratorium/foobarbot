/*jshint esversion: 6 */
//----------------------------------------------------------------------------//
//----------------------------Database stuff----------------------------------//

//mongoose init
var mongoose = require('mongoose');
//mlab connection URI (can be seen in "$ heroku config")
var mongodbUri = "mongodb://heroku_6lt22ghm:te2b1dta8i2glj7ss4lk71vjnm@ds037814.mlab.com:37814/heroku_6lt22ghm";
var mongodbUriJade = "mongodb://heroku_x2kvg897:l9un0e09ivtqtg98df2r3ciiup@ds059145.mlab.com:59145/heroku_x2kvg897";
//if we want to connect to another database, we have to change the mongodbUri (eg: dev and live database detection)


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
	testQuery();
});

//db.once is async, so I had to include everything in a function for now 
function testQuery() {
	//creating a schema/template (setting the columns and types)
	var userSchema = new Schema({
		firstname: String,
		lastname: String,
		email: String,
		age: Number,
		avatar: String
	});
	
	//setting a model structure. database name will ALWAYS be the lower-case version +s of the first parameter, second is the entry template
	// database name will be "kiskutyas"
	var User = mongoose.model('user', userSchema);
	//new database entry
	// var User1 = new User({
	// 	firstname: "Pista",
	// 	lastname: "Kiss",
	// 	email: "kisspista@gmail.com",
	// 	age: 12
  	// });
	
	// User1.avatar = "asdasd.jpg";

	//save a variable to the database
	//User1.save();
		
	// this is the query that is searching
	var query = User.find({age:20});	
}
