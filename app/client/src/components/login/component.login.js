// Login Component
// Template
var fs = require('fs');
var passwordHash = require('password-hash');
var html = fs.readFileSync(__dirname + '/component.login.html', 'utf8');

// Export global component
module.exports = {
	name: "LoginComponent",
	template: html,
	data: function(){
		return {
			loginform__email: "",
			loginform__password: "",
			errorMsg: ""
		};
	},
	methods: {
		loginUser: function(e){
			this.$store.dispatch({
					type: "createToken",
					userEmail: this.loginform__email,
					userPassword: this.loginform__password
				}).then((response) => {
					this.$router.push('settings');
				}, (fail) => {
					console.log('Oops, something went wrong!');		
					this.errorMsg = "Wrong credentials! Try again!";			
				})
	  	}
	}
};