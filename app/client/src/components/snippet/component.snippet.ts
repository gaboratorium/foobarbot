var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.snippet.html', 'utf8');
import { ISnippet } from "./../../interfaces/ISnippet"

// Export global component
export const SnippetViewComponent = {
	name: "SnippetComponent",
	template: html,

	// Data
	data: function(){
		return {
			snippet: ISnippet,
		};
	},

	// Created hook
	created: function(){
		var snippetId: string = this.$route.params.id;
        this.getSnippet(snippetId);
	},

	// Methods
	methods: {
		
		getSnippet: function(snippetId: number){
			console.log("snippet component get snippet recieves snippet id", snippetId);
			// this.$store.dispatch({
			// 	type: "getSnippets",
			// 	userId: userId,
			// }).then((response: any) => {
			// 	this.snippets = response;
			// 	this.snippetDataStatus = "loaded";
			// 	console.log(response.snippets);
			// }, (fail: any) => {
			// 	this.snippetDataStatus = "failed";
			// 	console.log(fail);
			// })
		}
  	}
};