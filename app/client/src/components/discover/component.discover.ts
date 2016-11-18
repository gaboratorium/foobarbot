// Login Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.discover.html', 'utf8');
var marked = require('marked');
var hljs = require("highlight.js");


hljs.configure({
  tabReplace: '  ', // 4 spaces
//   classPrefix: ''     // don't append class prefix
                      // … other options aren't changed
})

// Export global component
export const DiscoverViewComponent = {
	name: "DiscoverComponent",
	template: html,
	data: function(){
		return {
			users: Array,
			snippets: Array,
			errorMsg: String,
			isUserLoggedIn: Boolean,
			snippetDataStatus: String,
			searchText: String,
			isSearch: Boolean
		}
	},

	beforeRouteEnter (to: any, from: any, next: any) {
		next( (DiscoverComponent: any) => {
			DiscoverComponent.snippetDataStatus = "loading";
			DiscoverComponent.getSnippets();

			DiscoverComponent.isSearch = false;
			if (DiscoverComponent.$route.params.searchtext) {
				DiscoverComponent.searchText = DiscoverComponent.$route.params.searchtext;
				DiscoverComponent.isSearch = true;
				
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

		starSnippet: function(snippetId: string){
			console.log("Starring snippet...");
			if (this.$store.getters["mainstore/isUserLoggedIn"]) {
				this.$store.dispatch({
					type: 'postStar',
					snippetId: snippetId
				}).then((response: any) => {
					console.log("Starring item", response);
					this.showSnackBar("Snippet succesfully starred.");
					
				}, (fail: any) =>{
					console.log("Starring item failed", fail);
					
				});
			}
			else {
			}
			
		},

		showSnackBar: function(message: string) {
			var snackbarContainer = document.querySelector('#feature-in-development');
			componentHandler.upgradeElement(snackbarContainer);
			var data = {message: message};
			snackbarContainer.MaterialSnackbar.showSnackbar(data);
		},

		showInDevelopmentSnackbar: function(feature: string){
			setTimeout(() => {
				console.log("show toast");
				var snackbarContainer = document.querySelector('#feature-in-development');
				snackbarContainer.className += " mdl-snackbar--danger";
				// Reinitialize as MDL elem
				componentHandler.upgradeElement(snackbarContainer);
				console.log("snackbarcontainer.MaterialSnackbar", snackbarContainer.MaterialSnackbar);
				console.log("snackbarcontainer", snackbarContainer);
				var message = "This feature is still in development: " + feature;
				var data = {message: message};
				snackbarContainer.MaterialSnackbar.showSnackbar(data);
			}, 100);
			
		}
	}
};