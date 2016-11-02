// Login Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.about.html', 'utf8');

// Export global component
export const AboutViewComponent = {
	name: "AboutComponent",
	template: html,
	data: function(){
		return {
			users: Array,
			errorMsg: String
		}
	},
	methods: {
		loadUsers: function(e){
			e.preventDefault();
			var myToken = this.$store.getters.userToken;
			
	  		this.$store.dispatch({
				  type: 'loadUsers',
				  token: myToken
			  }).then((response) => {
				  this.users = response;
			  }, (fail) => {
				  // Fail
				  this.errorMsg = "You are not logged in.";
				  
			  });
	  	},

	  	resetUsers: function(e){
			e.preventDefault();
	  		this.users = [];
			this.errorMsg = "";
	  	}
	}
};