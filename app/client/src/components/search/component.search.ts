// Search Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.search.html', 'utf8');
var marked = require('marked');
var hljs = require("highlight.js");

hljs.configure({
  tabReplace: '  ', // 4 spaces
//   classPrefix: ''     // don't append class prefix
                      // … other options aren't changed
})

// Export global component
export const SearchViewComponent = {
	name: "SearchComponent",
	template: html,
	data: function(){
		return {
			users: Array,
			snippets: Array,
			snippetsFromGithub: Array,
			errorMsg: String,
			isUserLoggedIn: Boolean,
			snippetDataStatus: String,
			snippetDataFromGithubStatus: String,
			searchText: String,
			isSearch: Boolean
		}
	},

	beforeRouteEnter (to: any, from: any, next: any) {
		next( (DiscoverComponent: any) => {
			DiscoverComponent.snippetDataStatus = "loading";
			DiscoverComponent.snippetDataFromGithubStatus = "loading";
			DiscoverComponent.snippets = [];
			DiscoverComponent.isSearch = false;
			if (DiscoverComponent.$route.params.searchtext) {

				DiscoverComponent.searchText = DiscoverComponent.$route.params.searchtext;
				DiscoverComponent.isSearch = true;
				DiscoverComponent.getSnippets();
				DiscoverComponent.getSnippetsFromGithub();
			} else {
                DiscoverComponent.router.push("/discover");
            }
		})
	},

	created: function(){
		// this.snippetDataStatus = "loading";
		// this.getSnippets();
		
	},

	methods: {

		getSnippets: function(){
			var DiscoverComponent = this;

			this.$store.dispatch({
				  type: 'getSnippets',
				  searchText: DiscoverComponent.searchText,
				  snippetsMaxNumber: 3
			  }).then((response: any) => {
				  
				  // Converting text to markdown
				  for (var i = 0; i < response.length; i++) {
					 response[i].readme = marked(response[i].readme);
				  }

				  // Initialize Highlightjs
				  this.snippets = response;
				  setTimeout(function(){
					hljs.initHighlighting.called = false;
					hljs.initHighlighting();
					DiscoverComponent.snippetDataStatus = "loaded";
				  }, 200);


			  }, (fail: any) => {
				  
				  // Fail
			  });
		},

		getSnippetsFromGithub: function() {
			console.log("Getting snippets from Github... in Search Componen");
			var DiscoverComponent = this;
			this.$store.dispatch({
				type: 'getSnippetsFromGithub',
				snippetsMaxNumber: 5
			}).then((response: any) => {

				for (var i = 0; i < response.length; i++) {
					response[i].readme = marked(response[i].readme);
				}

				this.snippetsFromGithub = response;
				setTimeout(function(){
					hljs.initHighlighting.called = false;
					hljs.initHighlighting();
					DiscoverComponent.snippetDataFromGithubStatus = "loaded";
				  }, 200);
				
			}, (fail: any) =>{
				console.log("Github request failed", fail);
				
			})
			
		},

		starSnippet: function(snippetId: string){
			var SearchComponent = this;
			if (this.$store.getters["mainstore/isUserLoggedIn"]) {
				this.$store.dispatch({
					type: 'postStar',
					snippetId: snippetId
				}).then((response: any) => {

					SearchComponent.showSnackBar("Snippet succesfully starred.");
				}, (fail: any) =>{
					SearchComponent.showSnackbarDanger("You have already starred this item.");
				});
			}
			else {
				SearchComponent.showSnackbarDanger("You have to be logged in to star snippets.");
			}
			
		},

		starSnippetFromExternalApi: function(snippet: any){
			var SearchComponent = this;
			console.log("starSnippetFromExternalApi isUserLoggedIn", this.$store.getters["mainstore/isUserLoggedIn"]);
			
			if (this.$store.getters["mainstore/isUserLoggedIn"]) {
				console.log("search component sends request");
				
				this.$store.dispatch({
					type: 'starSnippetFromExternalApi',
					snippet: snippet
				});
			}
			else {
				SearchComponent.showSnackbarDanger("You have to be logged in to star snippets.");
			}
		},

		showSnackbarDanger: function(message: string){
			var snackbarContainer = document.querySelector('#snackbar--danger');
			componentHandler.upgradeElement(snackbarContainer);
			var data = {message: message};
			snackbarContainer.MaterialSnackbar.showSnackbar(data);
		},

		showSnackbar: function(message: string){
			var snackbarContainer = document.querySelector('#snackbar--danger');
			componentHandler.upgradeElement(snackbarContainer);
			var data = {message: message};
			snackbarContainer.MaterialSnackbar.showSnackbar(data);
		},

		showInDevelopmentSnackbar: function(feature: string){
			var snackbarContainer = document.querySelector('#snackbar--danger');
			componentHandler.upgradeElement(snackbarContainer);
			var message = "This feature is still in development: " + feature;
			var data = {message: message};
			snackbarContainer.MaterialSnackbar.showSnackbar(data);			
		}
	}
};