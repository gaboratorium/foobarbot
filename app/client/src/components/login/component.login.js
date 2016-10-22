// Login Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.login.html', 'utf8');

// Export global component
module.exports = {
	name: "LoginComponent",
	template: html,
	data: function(){
		return {
			myusername: "",
			mypassword: "",
			tab: 'login'
		}
	},
	methods: {
		loginUser: function(){

			console.log("component.login loginUser triggered");
			// authenticator.$emit('authenticate');
			this.$emit('send-test', 'Message from login component printed by app instance');

	  		// var body = {
	  		// 	"name": this.myusername,
	  		// 	"password": this.mypassword
	  		// };

	  		// this.$http.post('/api/authenticate', body).then(function(response){
	  		// 	if (response.ok) {
	  		// 		console.log(response.body.token);
	  		// 		app.userToken = response.body.token;
	  		// 	}
	  		// }, function(){
	  		// 	// success
	  		// });
	  	},

	  	logoutUser: function(){
	  		if (app.userToken !== null && app.userToken !== "") {
	  			app.userToken = "";
	  			console.log("You have logged out!");
	  		} else {
	  			console.log("You are not even logged in bro...");
	  		}
	  	},

	  	switchTab: function(tab){
	  		this.tab = tab;
	  	}
	}
};