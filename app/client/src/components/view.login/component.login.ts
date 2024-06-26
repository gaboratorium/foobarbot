import * as fs from "fs";
import { BusComponent } from "./../bus/component.bus";

var passwordHash = require('password-hash');

export const LoginViewComponent = {
	name: "LoginComponent",
	template: fs.readFileSync(__dirname + '/component.login.html', 'utf8'),
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
					BusComponent.$emit("showSnackbar", "You have succesfully logged in.", "success");
					this.$router.replace('dummy-replacement-so-we-force-router-change');
					this.$router.push('discover');
				}, (fail: any) => {
					this.errorMsg = "Wrong credentials! Try again!";			
				})
	  	}
	}
};