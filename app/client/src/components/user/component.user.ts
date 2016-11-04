// Signup Component
// Template
// GABORATORIUM
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.user.html', 'utf8');

// Export global component
export const UserViewComponent = {
	name: "UserComponent",
	template: html,

	created: function(){
		// Watcher also needed!
		console.log("Component recievet this user id", this.$route.params.id);
	},

	data: function(){
		return {
			dataStatus: String
		};
	},
	methods: {
		signupUser: function(){
          // Do stuff
	  	}
	}
};