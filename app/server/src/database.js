/*jshint esversion: 6 */
//----------------------------------------------------------------------------//
//----------------------------Database stuff----------------------------------//

//mongoose init
var mongoose = require('mongoose');
//mlab connection URI (can be seen in "$ heroku config")
var mongodbUri = "mongodb://heroku_6lt22ghm:te2b1dta8i2glj7ss4lk71vjnm@ds037814.mlab.com:37814/heroku_6lt22ghm";
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
	console.log("mLab Database Connected");
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

	// console.log("Name: "+ User1.firstname + " " + User1.lastname);
	// console.log("Email address: "+ User1.email);
	// console.log("Age: "+ User1.age);
	// console.log("Profile picture: "+ User1.avatar);
	
	
	// this is the query that is searching
	var query = User.find({age:20});


	var testPromise = query.exec(function(err, results){
		//is there's an error, we throw error
		if(err) return console.log("error");
		//return the results we found
		console.log(results);

		if (results.length>0) {
			results[0].age = 30;
			results[1].age = 21;
			results[0].save();
			results[1].save();			
		}
	});

}
