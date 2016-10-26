// Signup Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.signup.html', 'utf8');

// Export global component
module.exports = {
	name: "LoginComponent",
	template: html,
	data: function(){
		return {
			signupform__username: "",
			signupform__email: "",
			signupform__password: "",
			signupform__password2: ""
		};
	},
	methods: {
		signupUser: function(e){
            console.log('Signing up user...');
            
		// 	this.$store.dispatch({
		// 			type: "createToken",
		// 			userName: this.loginform__username,
		// 			userPassword: this.loginform__password
		// 		}).then((response) => {
		// 			this.$router.push('settings');
		// 		}, (fail) => {
		// 			console.log('Oops, something went wrong!');		
		// 			this.errorMsg = "Wrong credentials! Try again!";			
		// 		});
	  	}
	}
};