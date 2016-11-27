import * as fs from "fs";
import { SnippetListComponent } from "./../snippet-list/component.snippet-list";

var hljs = require("highlight.js");
var marked = require('marked');
var _ = require('lodash');

export const UserStarsComponent = {
    name: "UserStarsComponent",
	template: fs.readFileSync(__dirname + '/component.user.snippets.html', 'utf8'),

	components: {
		"snippet-list": SnippetListComponent
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

				this.snippets = _.pull(response, null);
				this.snippetDataStatus = "loaded";

			}, (fail: any) => {
				this.snippetDataStatus = "failed";
			})
		}
  	}
}