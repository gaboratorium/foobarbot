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
				console.log("Search text was provided in Search Component so I will ask for snippets...");
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
			console.log("Getting snippets from Github...");
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
			if (this.$store.getters["mainstore/isUserLoggedIn"]) {
				this.$store.dispatch({
					type: 'postStar',
					snippetId: snippetId
				}).then((response: any) => {
				}, (fail: any) =>{
					
				});
			}
			else {
			}
			
		},

		showInDevelopmentSnackbar: function(feature: string){
			setTimeout(() => {
				console.log("show toast");
				var snackbarContainer = document.querySelector('#feature-in-development');
				
				// Reinitialize as MDL elem
				componentHandler.upgradeElement(snackbarContainer);

				var message = "This feature is still in development: " + feature;
				var data = {message: message};
				snackbarContainer.MaterialSnackbar.showSnackbar(data);
			}, 100);
			
		}
	}
};