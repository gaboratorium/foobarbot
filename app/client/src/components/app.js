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
				path: '/kukucs',
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