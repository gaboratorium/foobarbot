// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.navbar.html', 'utf8')

// Export global component
module.exports =  {
	name: "NavbarComponent",
	template: html,
	data: function(){
		return {
			user: {
				name: ""
			},
			isUserLoggedIn: false

		}
	},
	created: function(){
		console.log('navbar created');
		
		if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
			this.user.name = this.$store.getters["mainstore/userName"];
			this.isUserLoggedIn = true;
		}
	},
	watch: {
		$route: function(){
			if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
				console.log('User is logged in');
				
				console.log('navbar user name', this.user.name);
				this.user.name = this.$store.getters["mainstore/userName"];
				console.log('navbar user name', this.user.name);
				
				this.isUserLoggedIn = true;

			} else {
				console.log('User is logged out');
				this.isUserLoggedIn = false;
			}
		}
	},
	methods: {
		logout: function(){
			this.$store.commit('unsetUserClient');
			this.$router.replace('dummy-replacement-so-we-force-router-change');
			this.$router.replace('about');
		}
	}
};