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
			if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
				console.log('User is logged in');
				this.isUserLoggedIn = true;

			} else {
				console.log('User is logged out');
				this.isUserLoggedIn = false;
			}

			this.user.name = this.$store.getters.userName;
		}
	},
	data: function(){
		return {
			user: {
				name: ""
			},
			isUserLoggedIn: false

		}
	},
	created: function(){
		if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
			this.isUserLoggedIn = true;
		}
		this.user.name = this.$store.getters.userName;
		console.log(this.$store.getters.userName);
		
	},
	methods: {
		logout: function(){
			this.$store.commit('unsetUserClient');
			this.$router.replace('asd');
			this.$router.replace('about');
		}
	}
};