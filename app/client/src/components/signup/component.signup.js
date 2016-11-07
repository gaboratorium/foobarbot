// Signup Component
// Template
var fs = require('fs');
var passwordHash = require('password-hash');
var html = fs.readFileSync(__dirname + '/component.signup.html', 'utf8');

// Export global component
module.exports = {
	name: "LoginComponent",
	template: html,
	data: function(){
		return {
			signupform__username: "",
			signupform__email: "",
			signupform__password: "",
			signupform__password2: "",
            errorMsg: "",
            isRegistrationSuccesful: false
		};
	},
	methods: {
		signupUser: function(e){
            if (this.signupform__password !== this.signupform__password2) {
                this.errorMsg = "The passwords you entered do not match.";
                return;
            }

			this.$store.dispatch({
					type: "signupUser",
					userName: this.signupform__username,
                    userEmail: this.signupform__email,
					userPassword: passwordHash.generate(this.signupform__password)
				}).then((response) => {
					console.log("Signup component recieves:", response);
                    this.isRegistrationSuccesful = true;
				}, (fail) => {
					console.log('Signup component recieves error:', fail);		
					this.errorMsg = fail.body.message;			
				});

	  	}
	}
};