// Login Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.discover.html', 'utf8');
var hljs = require("highlight.js");

// Export global component
export const DiscoverViewComponent = {
	name: "DiscoverComponent",
	template: html,
	data: function(){
		return {
			users: Array,
			snippets: Array,
			errorMsg: String,
			isUserLoggedIn: Boolean
		}
	},

	created: function(){
		this.getSnippets();		
	},

	methods: {

		getSnippets: function(){
			this.$store.dispatch({
				  type: 'getSnippets',
			  }).then((response: any) => {
				  console.log("about component get snippets recieves:", response);
				  this.snippets = response;

				  hljs.getLanguage("php");
				  hljs.getLanguage("perl");

				  console.log(hljs.getLanguage("php"));
				  console.log(hljs.getLanguage("perl"));
				  

			
				  var aCodes = document.getElementsByTagName('code');
				  console.log("I have these elements with php class", aCodes);
				  
				  
				  for (var index = 0; index < aCodes.length; index++) {
					  hljs.highlightBlock(aCodes[index]);
					  console.log(hljs.highlightBlock(aCodes[index]));
					  
				  }

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