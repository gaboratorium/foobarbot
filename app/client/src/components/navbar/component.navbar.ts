// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.navbar.html', 'utf8');

import { ComposeModalComponent } from './../composemodal/component.composemodal';

declare const localStorage: any;

// Export global component
export const NavbarComponent =  {
	name: "NavbarComponent",
	template: html,
	components: {
		"modal": ComposeModalComponent
	},
	
	data: function(){
		return {
			user: {
				name: String
			},
			isUserLoggedIn: false,
			showModal: false

		}
	},
	created: function(){
		var isUserLoggedIn = localStorage.userName !== undefined && localStorage.userToken !== undefined;
		console.log('navbar created', isUserLoggedIn);
		
		
		if (isUserLoggedIn) {
			this.user.name = localStorage.userName;
			this.isUserLoggedIn = true;
		} else {
			this.user.name = "";
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