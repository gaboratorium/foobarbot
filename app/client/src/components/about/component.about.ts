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
			snippets: Array,
			errorMsg: String
		}
	},

	created: function(){
		this.getSnippets();
	},

	methods: {
		loadUsers: function(){
			var myToken = this.$store.getters.userToken;
			
	  		this.$store.dispatch({
				  type: 'loadUsers',
				  token: myToken
			  }).then((response: any) => {
				  this.users = response;
			  }, (fail: any) => {
				  // Fail
				  this.errorMsg = "You are not logged in.";
				  
			  });
	  	},

	  	resetUsers: function(){
	  		this.users = [];
			this.errorMsg = "";
	  	},

		getSnippets: function(){
			this.$store.dispatch({
				  type: 'getSnippets',
			  }).then((response: any) => {
				  console.log("about component get snippets recieves:", response);
				  
				  this.snippets = response;
			  }, (fail: any) => {
				  // Fail
				  console.log("about component get snippets fails:", fail);
			  });
		}
	}
};