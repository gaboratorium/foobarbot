// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/components.settings.html', 'utf8')

// Export global component
module.exports =  {
	name: "SettingsComponent",
	template: html,
	data: function(){
		return {
			users: []
		}
	},
	methods: {
		loadUsers: function(e){
			e.preventDefault();
	  		this.$http.get('/api/users', { headers: {'x-access-token': app.userToken}}).then(function(response) {
	  			// success
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