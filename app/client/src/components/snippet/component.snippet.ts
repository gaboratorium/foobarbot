var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.snippet.html', 'utf8');
var marked = require('marked');
var hljs = require("highlight.js");

import { BusComponent } from './../bus/component.bus';

hljs.configure({
  tabReplace: '  '
})

// Export global component
export const SnippetComponent = {
	name: "SnippetComponent",
	template: html,
  props: {
    snippet: {type: Object, required: true}
  },
  methods: {
    sayHello: (snippetId: any) => {
      console.log("I am ", snippetId);
      BusComponent.$emit("showSnackbar", "Hello from snippet component");
    }
  }
};