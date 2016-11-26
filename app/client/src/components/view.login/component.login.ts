// Login Component
// Template
var fs = require('fs');
var passwordHash = require('password-hash');
var html = fs.readFileSync(__dirname + '/component.login.html', 'utf8');

// Export global component
export const LoginViewComponent = {
	name: "LoginComponent",
	template: html,
	data: function(){
		return {
			loginform__email: "",
			loginform__password: "",
			errorMsg: ""
		};
	},
	methods: {
		loginUser: function(){
			this.$store.dispatch({
					type: "createToken",
					userEmail: this.loginform__email,
					userPassword: this.loginform__password
				}).then((response: any) => {
					// Double redirection for forcing router state change
					this.showToast("You have succesfully logged in.");
					this.$router.replace('dummy-replacement-so-we-force-router-change');
					this.$router.push('discover');
				}, (fail: any) => {
					console.log('Oops, something went wrong!');		
					this.errorMsg = "Wrong credentials! Try again!";			
				})
	  	},

		showToast: function(message: string){
			console.log("show toast");
			var snackbarContainer = document.querySelector('#demo-toast-example');
			var data = {message: message};
			snackbarContainer.MaterialSnackbar.showSnackbar(data);
		}
	}
};