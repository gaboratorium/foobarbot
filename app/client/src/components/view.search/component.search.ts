import * as fs from "fs";
import { SnippetListComponent } from "./../snippet-list/component.snippet-list";
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
		"snippet-list": SnippetListComponent
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

	},

	methods: {

		getSnippets: function(){
			var DiscoverComponent = this;

			this.$store.dispatch({
				  type: 'getSnippets',
				  searchText: DiscoverComponent.searchText
			  }).then((response: any) => {
				  this.snippets = response;
				  setTimeout(function(){
					hljs.initHighlighting.called = false;
					hljs.initHighlighting();
					DiscoverComponent.snippetDataStatus = "loaded";
				  }, 0);
			  }, (fail: any) => {
			  });
		},

		getSnippetsFromGithub: function() {
			var DiscoverComponent = this;
			this.$store.dispatch({
				type: 'getSnippetsFromGithub',
				snippetsMaxNumber: 5
			}).then((response: any) => {
				this.snippetsFromGithub = response;
				setTimeout(function(){
					hljs.initHighlighting.called = false;
					hljs.initHighlighting();
					DiscoverComponent.snippetDataFromGithubStatus = "loaded";
				  }, 0);
				
			}, (fail: any) =>{
				
			})
		}
	}
};