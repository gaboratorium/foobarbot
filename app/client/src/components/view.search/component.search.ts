import * as fs from "fs";
import { SnippetComponent } from "./../snippet/component.snippet";
import { BusComponent } from './../bus/component.bus';

var marked = require('marked');
var hljs = require("highlight.js");

hljs.configure({
  tabReplace: '  '
})

// Export global component
export const SearchViewComponent = {
	name: "SearchComponent",
	template: fs.readFileSync(__dirname + '/component.search.html', 'utf8'),
	components: {
		"snippet": SnippetComponent
	},
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
				
			})
			
		},

		starSnippetFromExternalApi: function(snippet: any){
			var SearchComponent = this;
			
			if (this.$store.getters["mainstore/isUserLoggedIn"]) {
				
				this.$store.dispatch({
					type: 'starSnippetFromExternalApi',
					snippet: snippet
				}).then((response:any) => {
					
					SearchComponent.$store.dispatch({
						type: 'postStar',
						snippetId: response.snippetId
					}).then((response: any) => {
						SearchComponent.showSnackbar("Starring snippet was succesful!");
					})
					
				}, (fail: any) => {
					SearchComponent.showSnackbarDanger("Something went wrong!");
				});
			}
			else {
				SearchComponent.showSnackbarDanger("You have to be logged in to star snippets.");
			}
		}
	}
};