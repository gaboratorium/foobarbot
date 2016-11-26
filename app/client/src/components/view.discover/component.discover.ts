import { BusComponent } from './../bus/component.bus';
import { SnippetComponent } from "./../snippet/component.snippet";
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
		"snippet": SnippetComponent
	},

	data: function(){
		return {
			snippets: Array,
			snippetDataStatus: String,
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
				this.snippets = _.slice(response, 0, 5);
				setTimeout(function(){
					hljs.initHighlighting.called = false;
					hljs.initHighlighting();
					DiscoverComponent.snippetDataStatus = "loaded";
				}, 200);
			}, (fail: any) => {
				// Fail
			});
		}
	}
};