// Login Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.login.html', 'utf8');

// Export global component
module.exports = {
	name: "LoginComponent",
	template: html,
	props: {
		user: Object
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