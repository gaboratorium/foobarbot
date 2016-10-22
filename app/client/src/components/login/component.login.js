// Login Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.login.html', 'utf8');
var router = require('./../../instances/instance.router.js');

// Export global component
module.exports = {
	name: "LoginComponent",
	template: html,
	props: {
		user: Object,
		apiResponse: {
			isSuccessful: Boolean,
			package: Object,
			message: String
		}
	},
	watch: {
		apiResponse: function(newResponse){
			console.log("login comp watcher triggered");
			if (newResponse.isSuccessful) {
				// router.push('about');
			}
		}
	},
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
			this.$emit('create-token', this.loginform__username, this.loginform__password);
	  	},

	  	switchTab: function(tab){
	  		this.tab = tab;
	  	}
	}
};