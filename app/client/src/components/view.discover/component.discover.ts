import { BusComponent } from './../bus/component.bus';
import { SnippetListComponent } from "./../snippet-list/component.snippet-list";
import * as fs from "fs";
// import * as lodash from "lodash";

var marked = require('marked');
var hljs = require("highlight.js");
var _ = require("lodash");

// Export global component
export const DiscoverViewComponent = {
	name: "DiscoverComponent",
	template: fs.readFileSync(__dirname + '/component.discover.html', 'utf8'),
	components: {
		"snippet-list": SnippetListComponent
	},

	data: function(){
		return {
			snippets: Array,
			snippetDataStatus: String,
			exampleArray: [1,2,3,4,5]
		}
	},

	beforeRouteEnter (to: any, from: any, next: any) {
		next( (DiscoverComponent: any) => {
			DiscoverComponent.snippetDataStatus = "loading";
			DiscoverComponent.getSnippets();
		})
	},

	methods: {
		getSnippets: function(){
			var DiscoverComponent = this;
			this.$store.dispatch({
				  type: 'getSnippets',
			}).then((response: any) => {
				this.snippets = response;
				DiscoverComponent.snippetDataStatus = "loaded";
			}, (fail: any) => {
				// Fail
			});
		}
	}
};