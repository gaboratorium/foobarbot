// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.settings.html', 'utf8')

// Export global component
module.exports =  {
	name: "SettingsComponent",
	template: html,
	props: {
		user: Object
	},
	data: function(){
		return {
			users: []
		}
	},
	methods: {
		loadUsers: function(e){
			e.preventDefault();
			console.log(this.user);
	  		this.$http.get('/api/users', { headers: {'x-access-token': this.user.token}}).then(
	  			function(response) {
		  			// success
		  			console.log("Here you go.", response);
	  			}, function(response){
		  			// fail
		  			console.log("Sorry, only administrators can get the list of users.", response);
	  			}
	  		);
	  	},

	  	resetUsers: function(e){
			e.preventDefault();
	  		this.users = [];
	  	}
	}
};