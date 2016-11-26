import * as fs from "fs";

export const AboutViewComponent = {
	name: "AboutComponent",
	template: fs.readFileSync(__dirname + '/component.about.html', 'utf8'),
	
	data: function(){
		return {
			users: Array,
			snippets: Array,
			errorMsg: String,
			isUserLoggedIn: Boolean
		}
	},

	created: function(){
		this.getSnippets();		
	},

	methods: {
		loadUsers: function(){
			var myToken = this.$store.getters.userToken;
			
	  		this.$store.dispatch({
				  type: 'loadUsers',
				  token: myToken
			  }).then((response: any) => {
				  this.users = response;
			  }, (fail: any) => {
				  // Fail
				  this.errorMsg = "You are not logged in.";
				  
			  });
	  	},

	  	resetUsers: function(){
	  		this.users = [];
			this.errorMsg = "";
	  	},

		getSnippets: function(){
			this.$store.dispatch({
				  type: 'getSnippets',
			  }).then((response: any) => {
				  console.log("about component get snippets recieves:", response);
				  
				  this.snippets = response;
			  }, (fail: any) => {
				  // Fail
				  console.log("about component get snippets fails:", fail);
			  });
		},

		starSnippet: function(snippetId: string){
			console.log("You are trying to star this snippet:", snippetId);
			if (this.$store.getters["mainstore/isUserLoggedIn"]) {
				this.$store.dispatch({
					type: 'postStar',
					snippetId: snippetId
				}).then((response: any) => {
					console.log("You have succesfully starred the snippet", response);
				}, (fail: any) =>{
					console.log("about component postStar fails", fail);
					
				});
			}
			else {
				console.log("No login, no star.");
			}
			
		}
	}
};