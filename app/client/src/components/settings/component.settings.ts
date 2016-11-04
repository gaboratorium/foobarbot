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
			users: Array
		}
	},
	methods: {
		loadUsers: function(){
			var myToken = this.$store.getters.userToken;
			
	  		this.$store.dispatch({
				  type: 'loadUsers',
				  token: myToken
			  }).then((response: any) => {
				  console.log(response);
				  
				  this.users = response;
			  }, (fail: any) => {
				  // Fail
			  });
	  	},

	  	resetUsers: function(e){
	  		this.users = [];
	  	}
	}
};