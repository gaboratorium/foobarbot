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
			tab: 'login'
		}
	},
	methods: {
		loginUser: function(e){
			e.preventDefault();
			this.$store.dispatch({
					type: "getStarWars",
					userName: this.loginform__username,
					userPassword: this.loginform__password
				}).then((response) => {
					// if ok, router.push(home)
					// if not ok, output something for the user
				})


			// this.$emit('create-token', this.loginform__username, this.loginform__password);
	  	},

	  	switchTab: function(tab){
	  		this.tab = tab;
	  	}
	}
};