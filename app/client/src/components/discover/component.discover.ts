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

	created: function(){
		this.snippetDataStatus = "loading";
		this.getSnippets();		
	},

	computed: {
		compiledMarkdown: function (text: string) {
			return text;
		}
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
					hljs.initHighlighting();
					DiscoverComponent.snippetDataStatus = "loaded";
				  }, 200);


			  }, (fail: any) => {
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