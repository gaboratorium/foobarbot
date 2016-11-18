	// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.settings.html', 'utf8')

// Export global component
export const SettingsViewComponent =  {
	name: "SettingsComponent",
	template: html,
	data: function(){
		return {
			user: {
				userEmail: "userEmail",
				userName: "userName"
			}
		}
	},
	methods: {
		updateUser: function(){
			console.log("Updating user...");
	  	},

		deleteUser: function(){
			console.log("Deleting user...");
			
		}
	}
};