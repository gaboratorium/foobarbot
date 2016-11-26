var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.snippet.html', 'utf8');
var marked = require('marked');
var hljs = require("highlight.js");

hljs.configure({
  tabReplace: '  '
})

// Export global component
export const SnippetComponent = {
	name: "SnippetComponent",
	template: html,
    props: ["snippet"]
};