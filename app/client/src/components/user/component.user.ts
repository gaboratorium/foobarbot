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
			user: Object,
			snippets: Object,
			snippetDataStatus: String
		};
	},

	// Created hook
	created: function(){
		this.dataStatus = "loading"
		var requestedId: string = this.$route.params.id;

		console.log("requested id", requestedId);
		console.log("is user logged in", this.$store.getters["mainstore/isUserLoggedIn"]);
		
		
		if (requestedId == "me" && this.$store.getters["mainstore/isUserLoggedIn"]) {
			requestedId = this.$store.getters["mainstore/userId"];
		}

		this.loadUser(requestedId);
		this.loadSnippets(requestedId);
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
					this.$router.push({name: "about"});

				})
	  	},

		getSnippets: function(userId: number){
			console.log("loadSnippets fired")
			this.$store.dispatch({
				type: "getSnippets",
				userId: userId,
			}).then((response: any) => {
				this.snippets = response;
				this.snippetDataStatus = "loaded";
			}, (fail: any) => {
				this.snippetDataStatus = "failed";
			})
		}
  	}
};