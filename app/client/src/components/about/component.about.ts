// Login Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.about.html', 'utf8');

interface IUsers {
	users: Array<any>
}

// Export global component
export const AboutViewComponent = {
	name: "AboutComponent",
	template: html,
	data: () => {
		return {
			users: Array,
			errorMsg: String
		}
	},
	methods: {
		loadUsers: () => {
			var myToken = this.$store.getters.userToken;
			
	  		this.$store.dispatch({
				  type: 'loadUsers',
				  token: myToken
			  }).then((response: IUsers) => {
				  console.log(response);
				  
				  this.users = response;
			  }, (fail:any) => {
				  // Fail
				  this.errorMsg = "You are not logged in.";
				  
			  });
	  	},

	  	resetUsers: () => {
	  		this.users = [];
			this.errorMsg = "";
	  	}
	}
};