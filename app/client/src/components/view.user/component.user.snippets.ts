import * as fs from "fs";
import { SnippetComponent } from "./../snippet/component.snippet";

var hljs = require("highlight.js");
var marked = require('marked');


// Export global component
export const UserSnippetsComponent = {
	name: "UserSnippetsComponent",
	template: fs.readFileSync(__dirname + '/component.user.snippets.html', 'utf8'),

	components: {
		"snippet": SnippetComponent
	},

	// Data
	data: function(){
		return {
			userDataStatus: String,
			user: Object,
			snippets: Object,
			snippetDataStatus: String
		};
	},

	// Created hook
	created: function(){
		this.userDataStatus = "loading";
		this.snippetDataStatus = "loading";
		var requestedId: string = this.$route.params.id;

		console.log("requested id", requestedId);
		console.log("is user logged in", this.$store.getters["mainstore/isUserLoggedIn"]);
		
		
		if (requestedId == "me" && this.$store.getters["mainstore/isUserLoggedIn"]) {
			requestedId = this.$store.getters["mainstore/userId"];
		}

		this.loadUser(requestedId);
		this.getSnippets(requestedId);
	},

	// Methods
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

				// Converting text to markdown
				for (var i = 0; i < response.length; i++) {
					response[i].readme = marked(response[i].readme);
				}

				this.snippets = response;

				setTimeout(function(){
					console.log("Highlighting code...");
					hljs.initHighlighting.called=false;
					hljs.initHighlighting();
					UserComponent.snippetDataStatus = "loaded";

				  }, 200);
				console.log(response.snippets);
			}, (fail: any) => {
				this.snippetDataStatus = "failed";
				console.log(fail);
			})
		},

		showSnackbarDanger: function(message: string){
			var snackbarContainer = document.querySelector('#snackbar--danger');
			componentHandler.upgradeElement(snackbarContainer);
			var data = {message: message};
			snackbarContainer.MaterialSnackbar.showSnackbar(data);
		},
  	}
};