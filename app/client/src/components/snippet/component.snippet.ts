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
			snippet: undefined as ISnippet,
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
			console.log("snippet component get snippet recieves snippet id", snippetId);
			this.$store.dispatch({
				type: "getSnippet",
				snippetId: snippetId,
			}).then((response: any) => {
				this.snippet = response;
				this.snippetDataStatus = "loaded";
				console.log("snippet component get snippet recieves this repsonse:", response);
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