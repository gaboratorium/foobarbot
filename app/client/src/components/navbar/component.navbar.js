// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.navbar.html', 'utf8')

// Export global component
module.exports =  {
	name: "NavbarComponent",
	template: html,
	props: {
		userForNavbar: {
			name: String,
			token: String
		},
		csencs: String
	},
	watch: {
		csencs: function(newCsencs){
			console.log("Navbar Watcher trigerred...");
			if (newCsencs.token !=='') {
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