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
	    users: []
	  },
	  methods: {
	  	loadUsers: function(){
	  		console.log("button clicked");
	  		// this.$http.get('http://jsonplaceholder.typicode.com/users').then(function(response) {
	  		this.$http.get('/api/test').then(function(response) {
	  			console.log("success", response)
	  			this.users = response.body;
	  		}, function(response){
	  			console.log("fail", response)
	  		}
	  		)
	  	},

	  	postRequest: function(){

	  		var body = {
	  			"name": "Post request Pete",
	  			"password": "asd1234"
	  		};

	  		this.$http.post('/api/authenticate', body).then(function(){
	  			// success
	  		}, function(){
	  			// success
	  		});
	  	}
	  },
	  router
	}).$mount('#app');

}