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
    snippet: {type: Object, required: true}
  },

  created: function() {
    this.snippet.readme = marked(this.snippet.readme);
  },

  methods: {
    copyCode: (snippetId: any) => {
      BusComponent.$emit("showSnackbar", "This feature is still in development: copy code to clipboard.", "danger");
    },

    expandView: (snippetId: any) => {
      BusComponent.$emit("showSnackbar", "This feature is still in development: expand view.", "danger");
    },

		starSnippet: function(snippetId: string, snippet: any){
			var SnippetComponent = this;
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
    }
  }
};