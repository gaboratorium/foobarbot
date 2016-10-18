// Login Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/components.login.html', 'utf8');

// Export global component
module.exports = {
	name: "LoginComponent",
	template: html,
	data: function(){
		return {
			myusername: "",
			mypassword: "",
		}
	},
	methods: {
		loginUser: function(){

	  		var body = {
	  			"name": this.myusername,
	  			"password": this.mypassword
	  		};

	  		this.$http.post('/api/authenticate', body).then(function(response){
	  			if (response.ok) {
	  				console.log(response.body.token);
	  				app.userToken = response.body.token;
	  			}
	  		}, function(){
	  			// success
	  		});
	  	},

	  	logoutUser: function(){
	  		if (app.userToken !== null && app.userToken !== "") {
	  			app.userToken = "";
	  			console.log("You have logged out!");
	  		} else {
	  			console.log("You are not even logged in bro...");
	  		}
	  	}
	}
};