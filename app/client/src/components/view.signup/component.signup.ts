import * as fs from "fs";
var passwordHash = require('password-hash');

export const SignupViewComponent = {
	name: "LoginComponent",
	template: fs.readFileSync(__dirname + '/component.signup.html', 'utf8'),
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
		signupUser: function(){
            if (this.signupform__password !== this.signupform__password2) {
                this.errorMsg = "The passwords you entered do not match.";
                return;
            }

			this.$store.dispatch({
					type: "signupUser",
					userName: this.signupform__username,
                    userEmail: this.signupform__email,
					userPassword: passwordHash.generate(this.signupform__password)
				}).then((response: any) => {
                    this.isRegistrationSuccesful = true;
				}, (fail: any) => {
					this.errorMsg = fail.body.message;			
				});

	  	}
	}
};