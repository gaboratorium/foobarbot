var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.user.html', 'utf8');

// Export global component
export const UserViewComponent = {
	name: "UserComponent",
	template: html,

	// Data
	data: function(){
		return {
			dataStatus: String,
			user: Object
		};
	},

	// Created hook
	created: function(){
		this.dataStatus = "loading"
		this.loadUser(this.$route.params.id);
	},

	// Methods
	methods: {
		loadUser: function(userId: string){
			this.$store.dispatch({
					type: "getUser",
					userId: userId,
				}).then((response: any) => {
					// Double redirection for forcing router state change
					this.user = response;
					this.dataStatus = "loaded";
					
				}, (fail: any) => {
					this.dataStatus = "failed";
					// this.$router.push('about');

				})
	  	}
  	}
};