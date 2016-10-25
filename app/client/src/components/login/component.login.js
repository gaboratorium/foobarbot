// Login Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.login.html', 'utf8');
var router = require('./../../instances/instance.router.js');

// Export global component
module.exports = {
	name: "LoginComponent",
	template: html,
	data: function(){
		return {
			loginform__username: "",
			loginform__password: "",
			tab: 'login',
			errorMsg: ""
		}
	},
	methods: {
		loginUser: function(e){
			e.preventDefault();
			this.$store.dispatch({
					type: "createToken",
					userName: this.loginform__username,
					userPassword: this.loginform__password
				}).then((response) => {
					this.$router.push('settings');
				}, (fail) => {
					console.log('Oops, something went wrong!');		
					this.errorMsg = "Wrong credentials! Try again!";			
				})
	  	},

	  	switchTab: function(e, tab){
			e.preventDefault();
	  		this.tab = tab;
	  	}
	}
};