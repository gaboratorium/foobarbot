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
			snippetDataStatus: String
		}
	},

	beforeRouteEnter (to: any, from: any, next: any) {
		next( (DiscoverComponent: any) => {
			console.log("Entering discover route, these are the users", DiscoverComponent.users);
			DiscoverComponent.snippetDataStatus = "loading";
			DiscoverComponent.getSnippets();
			// hljs.initHighlighting();
		})
	},

	created: function(){
		// this.snippetDataStatus = "loading";
		// this.getSnippets();		
	},

	methods: {

		getSnippets: function(){
			console.log("get snippets is called");
			
			var DiscoverComponent = this;
			this.$store.dispatch({
				  type: 'getSnippets',
			  }).then((response: any) => {
				  console.log("getsnippets request succesful");

				  // Converting text to markdown
				  for (var i = 0; i < response.length; i++) {
					 response[i].readme = marked(response[i].readme);
				  }

				  // Initialize Highlightjs
				  this.snippets = response;
				  setTimeout(function(){
					console.log("Highlighting code...");
					hljs.initHighlighting.called = false;
					hljs.initHighlighting();
					console.log(hljs.listLanguages());
					DiscoverComponent.snippetDataStatus = "loaded";
				  }, 200);


			  }, (fail: any) => {
				  console.log("getsnippets request failed");
				  
				  // Fail
				  console.log("about component get snippets fails:", fail);
			  });
		},

		starSnippet: function(snippetId: string){
			console.log("You are trying to star this snippet:", snippetId);
			if (this.$store.getters["mainstore/isUserLoggedIn"]) {
				this.$store.dispatch({
					type: 'postStar',
					snippetId: snippetId
				}).then((response: any) => {
					console.log("You have succesfully starred the snippet", response);
				}, (fail: any) =>{
					console.log("about component postStar fails", fail);
					
				});
			}
			else {
				console.log("No login, no star.");
			}
			
		}
	}
};