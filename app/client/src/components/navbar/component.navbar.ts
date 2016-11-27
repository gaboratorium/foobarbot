import * as fs from "fs";
import { ComposeModalComponent } from './../composemodal/component.composemodal';
import { BusComponent } from './../bus/component.bus';

declare const localStorage: any;

export const NavbarComponent =  {
	name: "NavbarComponent",
	template: fs.readFileSync(__dirname + '/component.navbar.html', 'utf8'),
	components: {
		"modal": ComposeModalComponent
	},
	
	data: function(){
		return {
			user: {
				name: String
			},
			isUserLoggedIn: false,
			showModal: false,
			textToSearch: String

		}
	},
	created: function(){
		this.textToSearch = "";
		var isUserLoggedIn = localStorage.userName !== undefined && localStorage.userToken !== undefined;
		
		
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
			BusComponent.$emit("showSnackbar", "You have succesfully logged out.", "success");
		},

		search: function() {
			this.$router.push('/discover');
			this.$router.push('/search/' + this.textToSearch);
		}
	}
};