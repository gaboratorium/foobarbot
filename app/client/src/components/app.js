// app.js
// Initialises the application and sets the routing options


window.onload  = function(){
	
	///////////////////////////////////////	
	// Components
	const LoginComponent = require('./login/components.login.js');
	const SettingsComponent = require('./settings/components.settings.js');

	///////////////////////////////////////	
	// Routes
	const router = new VueRouter({
		routes: [

			// Home
			{
				path: '/',
				redirect: '/login'
			},
			
			// Login
			{
				path: '/login',
				name: 'login',
				component: LoginComponent
			}, 

			// Settings
			{
				path: '/settings',
				name: 'settings',
				component: SettingsComponent
			}
		]
	})

	///////////////////////////////////////
	// Init Vue app
	var app = new Vue({
	  el: '#app',
	  name: "myVueApp",
	  data: {
	  	debug: true,
	    message: 'Hello Vue, how you doin\'?',
	    userToken: '',
	    myusername: "",
	    mypassword: "",
	    users: []
	  },
	  methods: {
	  	loadUsers: function(){
	  		this.$http.get('/api/users', { headers: {'x-access-token': app.userToken}}).then(function(response) {
	  			this.users = response.body;
	  		}, function(response){
	  			// fail
	  		}
	  		)
	  	},

	  	loginUser: function(){

	  		var body = {
	  			"name": app.myusername,
	  			"password": app.mypassword
	  		};

	  		this.$http.post('/api/authenticate', body).then(function(response){
	  			if (response.ok) {
	  				console.log(response.body.token);
	  				app.userToken = response.body.token;
	  			}
	  		}, function(){
	  			// success
	  		});
	  	},

	  	logoutUser: function(){
	  		if (app.userToken !== null && app.userToken !== "") {
	  			app.userToken = "";
	  			console.log("You have logged out!");
	  		} else {
	  			console.log("You are not even logged in bro...");
	  		}
	  	},

	  	resetUsers: function(){
	  		app.users = [];
	  	}
	  },
	  router
	}).$mount('#app');

}