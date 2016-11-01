// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.navbar.html', 'utf8')

// Export global component
export const NavbarComponent =  {
	name: "NavbarComponent",
	template: html,
	data: function(){
		return {
			user: {
				name: undefined
			},
			isUserLoggedIn: false

		}
	},
	created: function(){
		var isUserLoggedIn = this.$store.getters["mainstore/isUserLoggedIn"];
		console.log('navbar created, recieves this isUserLoggedin from store', isUserLoggedIn);
		
		
		if (isUserLoggedIn) {
			this.user.name = this.$store.getters["mainstore/userName"];
			this.isUserLoggedIn = true;
		}
	},
	watch: {
		$route: function(){
			var isUserLoggedIn = this.$store.getters["mainstore/isUserLoggedIn"];
			var myUserId = this.$store.getters["mainstore/userId"];
			
			if (isUserLoggedIn) {				
				this.user.name = this.$store.getters["mainstore/userName"];
				this.isUserLoggedIn = true;
			} else {
				this.user.name = undefined;
				this.isUserLoggedIn = false;
			}
		}
	},
	methods: {
		logout: function(){
			this.$store.commit('unsetUserClient');
			// Double redirection for forcing router state change
			this.$router.replace('dummy-replacement-so-we-force-router-change');
			this.$router.replace('about');
		}
	}
};