import * as fs from "fs";
import { SnippetComponent } from "./../snippet/component.snippet";

var hljs = require("highlight.js");
var marked = require('marked');

export const UserStarsComponent = {
    name: "UserStarsComponent",
	template: fs.readFileSync(__dirname + '/component.user.snippets.html', 'utf8'),

	components: {
		"snippet": SnippetComponent
	},

	data: function(){
		return {
			userDataStatus: String,
			user: Object,
			snippets: Object,
			snippetDataStatus: String
		};
	},

	created: function(){
		this.userDataStatus = "loading";
		this.snippetDataStatus = "loading";
		var requestedId: string = this.$route.params.id;
		
		if (requestedId == "me" && this.$store.getters["mainstore/isUserLoggedIn"]) {
			requestedId = this.$store.getters["mainstore/userId"];
		}

		this.loadUser(requestedId);
		this.getSnippets(requestedId);
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
					
				}, (fail: any) => {
					this.userDataStatus = "failed";
					this.$router.push({name: "about"});

				})
	  	},

		getSnippets: function(userId: number){
			var UserComponent = this;
			this.$store.dispatch({
				type: "getStarredSnippets",
				userId: userId,
			}).then((response: any) => {

				// Converting text to markdown
				for (var i = 0; i < response.length; i++) {
					response[i].readme = marked(response[i].readme);
				}

				this.snippets = response;

				setTimeout(function(){
					hljs.initHighlighting.called=false;
					hljs.initHighlighting();
					UserComponent.snippetDataStatus = "loaded";

				  }, 0);
			}, (fail: any) => {
				this.snippetDataStatus = "failed";
			})
		}
  	}
}