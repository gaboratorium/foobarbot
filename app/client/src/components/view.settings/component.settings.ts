import * as fs from "fs";

export const SettingsViewComponent =  {
	name: "SettingsComponent",
	template: fs.readFileSync(__dirname + '/component.settings.html', 'utf8'),
	data: function(){
		return {
			user: {
				userEmail: "userEmail",
				userName: "userName",
				errorMsg: ""
			}
		}
	},
	methods: {
		updateUser: function(){
			console.log("Updating user...");
	  	},

		deleteUser: function(){
			var SettingsViewComponent = this;
			console.log("Deleting user...");
			this.errorMsg = "Something went wrong...";
			this.$store.dispatch({
					type: 'deleteUser',
				}).then((response: any) => {
					// Log user out
					SettingsViewComponent.$store.commit('unsetUserClient');
					SettingsViewComponent.$router.replace('dummy-replacement-so-we-force-router-change');
					SettingsViewComponent.$router.push('discover');

				}, (fail: any) =>{
					// Fail
				});
		}
	}
};