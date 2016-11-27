import * as fs from "fs";
import { ISnippet } from "./../../interfaces/ISnippet";
import { SnippetComponent } from "./../snippet/component.snippet";

var hljs = require("highlight.js");
var marked = require('marked');

export const SnippetViewComponent = {
	name: "SnippetComponent",
	template: fs.readFileSync(__dirname + '/component.snippet.html', 'utf8'),
	components: {
		"snippet": SnippetComponent
	},

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
		var snippetId: string = this.$route.params.id;
        this.getSnippet(snippetId);
	},

	// Methods
	methods: {
		
		getSnippet: function(snippetId: number){
			var SnippetComponent = this;
			this.$store.dispatch({
				type: "getSnippet",
				snippetId: snippetId,
			}).then((response: any) => {
				response[0].readme = marked(response[0].readme);
				SnippetComponent.snippet = response[0];
				
				this.snippetDataStatus = "loaded";
				
				setTimeout(function(){
					hljs.initHighlighting.called = false;
					hljs.initHighlighting();
				}, 0);
				
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