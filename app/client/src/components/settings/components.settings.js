// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/components.settings.html', 'utf8')

// Export global component
module.exports =  {
	name: "SettingsComponent",
	template: html,
	props: ['message'],
	data: function(){
		return {
			users: []
		}
	},
	methods: {
		loadUsers: function(e){
			e.preventDefault();
			console.log(message);
			console.log(app.userToken);
			console.log(app.users);
	  		this.$http.get('/api/users', { headers: {'x-access-token': app.userToken}}).then(function(response) {
	  			// app.users = response.body;
	  			console.log(response);
	  		}, function(response){
	  			// fail
	  		}
	  		)
	  	},

	  	resetUsers: function(e){
			e.preventDefault();
	  		this.users = [];
	  	}
	}
};