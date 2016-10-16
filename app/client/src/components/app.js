// app.js
// Initialises the application and sets the routing options
var fs = require('fs');


window.onload  = function(){
	
	///////////////////////////////////////	
	// Components
	var html = fs.readFileSync(__dirname + '/login/components.login.html', 'utf8');
	const LoginComponent = {
		template: html
	}
	
	const SettingsComponent = {
		template: require('./settings/components.settings.js')
	}

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
	  data: {
	    message: 'Hello Vue, how you doin\'?'
	  },
	  router
	}).$mount('#app');

}