import * as fs from "fs";

export const UserViewComponent = {
	name: "UserComponent",
	template: fs.readFileSync(__dirname + '/component.user.html', 'utf8'),

	data: function(){
		return {
			userDataStatus: String,
			user: Object,
			snippets: Array,
			starredSnippets: Array
		};
	},

	created: function(){
		this.userDataStatus = "loading";
		var requestedId: string = this.$route.params.id;
		
		if (requestedId == "me" && this.$store.getters["mainstore/isUserLoggedIn"]) {
			requestedId = this.$store.getters["mainstore/userId"];
		}

		this.loadUser(requestedId);
		this.getSnippets(requestedId);
		this.getStarredSnippets(requestedId);
	},

	methods: {
		loadUser: function(userId: string){
			this.$store.dispatch({
					type: "getUser",
					userId: userId,
				}).then((response: any) => {
					// Double redirection for forcing router state change
					this.user = response.user;
					this.userDataStatus = "loaded";
					console.log("loaded this user:", this.user.userName);
					
					
				}, (fail: any) => {
					this.userDataStatus = "failed";
					this.$router.push({name: "about"});

				})
	  	},

		getSnippets: function(userId: number){
			console.log("loadSnippets fired")
			var UserComponent = this;
			this.$store.dispatch({
				type: "getSnippets",
				userId: userId,
			}).then((response: any) => {

				this.snippets = response;

			}, (fail: any) => {
				this.snippetDataStatus = "failed";
				console.log(fail);
			})
		},

		getStarredSnippets: function(userId: number){
			console.log("loadSnippets fired")
			var UserComponent = this;
			this.$store.dispatch({
				type: "getStarredSnippets",
				userId: userId,
			}).then((response: any) => {
				this.starredSnippets = response;
			}, (fail: any) => {
				this.snippetDataStatus = "failed";
				console.log(fail);
			})
		}
  	}
};