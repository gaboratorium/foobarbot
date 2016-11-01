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
				name: undefined
			},
			isUserLoggedIn: false

		}
	},
	created: function(){
		console.log('navbar created');
		var isUserLoggedIn = this.$store.getters["mainstore/isUserLoggedIn"];
		if (isUserLoggedIn) {
			this.user.name = this.$store.getters["mainstore/userName"];
			this.isUserLoggedIn = true;
		}
	},
	watch: {
		$route: function(){
			var isUserLoggedIn = this.$store.getters["mainstore/isUserLoggedIn"];
			
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
			this.$router.replace('dummy-replacement-so-we-force-router-change');
			this.$router.replace('about');
		}
	}
};