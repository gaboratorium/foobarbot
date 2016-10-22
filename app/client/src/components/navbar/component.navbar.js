// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.navbar.html', 'utf8')

// Export global component
module.exports =  {
	name: "NavbarComponent",
	template: html,
	props: {
		user: Object
	},
	data: function(){
		return {
		
		}
	},
	methods: {
		isUserLoggedIn: function(){
			return localStorage.token !== undefined;
		},
		logout: function(){
			console.log("Logging out...");
			this.$emit('applogout');
		}
	}
};