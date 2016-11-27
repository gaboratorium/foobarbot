import * as fs from "fs";
import { BusComponent } from './../bus/component.bus';
// import * as hljs from "highlight.js";
// import * as marked from "marked";

var marked = require('marked');
var hljs = require("highlight.js");

hljs.configure({
  tabReplace: '  '
})

export const SnippetComponent = {
	name: "SnippetComponent",
	template: fs.readFileSync(__dirname + '/component.snippet.html', 'utf8'),
  props: {
    snippet: {type: Object, required: true},
		isExpanded: {type: Boolean},
		hljsInit: {type: Boolean}
  },

	data: function(){
		return {
			readyToShow: true
		}
	},

  created: function() {
    this.snippet.readme = marked(this.snippet.readme);

		if (this.hljsInit) {
			var SnippetComponent = this;
			SnippetComponent.readyToShow = false;
			setTimeout(function(){
				hljs.initHighlighting.called = false;
				hljs.initHighlighting();
				SnippetComponent.readyToShow = true;
			}, 0)
		}
  },

  methods: {
    copyCode: (snippetId: any) => {
      BusComponent.$emit("showSnackbar", "This feature is still in development: copy code to clipboard.", "danger");
    },

    expandView: (snippetId: any) => {
      BusComponent.$emit("showSnackbar", "This feature is still in development: expand view.", "danger");
    },

		starSnippet: function(snippetId: string, snippet: any){
			if (this.snippet.vendor) {
				this.starExternal(snippetId, snippet);
			} else {
				this.starInternal(snippetId, snippet);
			}
    },

		starInternal: function(snippetId: string, snippet: any) {
			if (this.$store.getters["mainstore/isUserLoggedIn"]) {
				this.$store.dispatch({
					type: 'postStar',
					snippetId: snippetId,
					snippet: snippet
				}).then((response: any) => {
					BusComponent.$emit("showSnackbar", "Snippet succesfully starred.", "success");
				}, (fail: any) =>{
					BusComponent.$emit("showSnackbar", "You have already starred this item.", "danger");
				});
			}
			else {
				BusComponent.$emit("showSnackbar", "Only registered members can star snippets.", "danger");
			}			
		},

		starExternal: function(snippetId: string, snippet: any) {
			var SnippetComponent = this;
			if (this.$store.getters["mainstore/isUserLoggedIn"]) {
				
				this.$store.dispatch({
					type: 'starSnippetFromExternalApi',
					snippet: snippet
				}).then((response:any) => {
					
					SnippetComponent.$store.dispatch({
						type: 'postStar',
						snippetId: response.snippetId
					}).then((response: any) => {
						BusComponent.$emit("showSnackbar", "Starring snippet was succesful!", "success");
					})
					
				}, (fail: any) => {
						BusComponent.$emit("showSnackbar", "Something went wrong", "danger");
				});
			}
			else {
					BusComponent.$emit("showSnackbar", "You have to be logged in to star snippets.", "danger");
			}
		}
  }
};