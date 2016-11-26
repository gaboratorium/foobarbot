import * as fs from "fs";
import { ISnippet } from "./../../interfaces/ISnippet";

var hljs = require("highlight.js");
var marked = require('marked');

export const SnippetViewComponent = {
	name: "SnippetComponent",
	template: fs.readFileSync(__dirname + '/component.snippet.html', 'utf8'),

	// Data
	data: function(){
		return {
			snippet: {
				snippetCode: "",
				tag1: "",
				tag2: "",
				tag3: "",
				readme: "",
				userId: ""

			} as ISnippet,
            snippetDataStatus: "loading" as String
		};
	},

	// Created hook
	created: function(){
		console.log("Snippet component created");
		var snippetId: string = this.$route.params.id;
        this.getSnippet(snippetId);
	},

	// Methods
	methods: {
		
		getSnippet: function(snippetId: number){
			var SnippetComponent = this;
			console.log("snippet component get snippet recieves snippet id", snippetId);
			this.$store.dispatch({
				type: "getSnippet",
				snippetId: snippetId,
			}).then((response: any) => {
				console.log("snippet component recieves response obj", response[0]);
				response[0].readme = marked(response[0].readme);
				SnippetComponent.snippet = response[0];
				hljs.initHighlighting.called = false;
				hljs.initHighlighting();
				this.snippetDataStatus = "loaded";
				if (response.length == 0) {
					this.$router.push({name: "about"});
				}
			}, (fail: any) => {
				this.snippetDataStatus = "failed";
				this.$router.push({name: "about"});
			})
		}
  	}
};