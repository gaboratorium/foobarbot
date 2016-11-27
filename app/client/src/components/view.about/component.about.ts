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
				  
				  this.snippets = response;
			  }, (fail: any) => {
				  // Fail
			  });
		},

		starSnippet: function(snippetId: string){
			if (this.$store.getters["mainstore/isUserLoggedIn"]) {
				this.$store.dispatch({
					type: 'postStar',
					snippetId: snippetId
				}).then((response: any) => {

				}, (fail: any) =>{
					
				});
			}
			else {

			}
			
		}
	}
};