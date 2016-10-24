// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.navbar.html', 'utf8')

// Export global component
module.exports =  {
	name: "NavbarComponent",
	template: html,
	watch: {
		$route: function(){
			let ok = this.$store.getters.isUserLoggedIn;
			if (ok) {
				this.isUserLoggedIn = true;
			}
		}
	},
	data: function(){
		return {
			user: {
				name: localStorage.name
			},
			isUserLoggedIn: false

		}
	},
	methods: {
		logout: function(){
			console.log("Logging out...");
			this.$emit('applogout');
		}
	}
};