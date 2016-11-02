// Login Component
// Template
var fs = require('fs');
var passwordHash = require('password-hash');
var html = fs.readFileSync(__dirname + '/component.login.html', 'utf8');

// Export global component
export const LoginViewComponent = {
	name: "LoginComponent",
	template: html,
	data: () => {
		return {
			loginform__email: "",
			loginform__password: "",
			errorMsg: ""
		};
	},
	methods: {
		loginUser: () => {
			this.$store.dispatch({
					type: "createToken",
					userEmail: this.loginform__email,
					userPassword: this.loginform__password
				}).then((response: any) => {
					console.log('createTOken response', response);
					
					// Double redirection for forcing router state change
					this.$router.replace('dummy-replacement-so-we-force-router-change');
					this.$router.push('settings');
				}, (fail: any) => {
					console.log('Oops, something went wrong!');		
					this.errorMsg = "Wrong credentials! Try again!";			
				})
	  	}
	}
};