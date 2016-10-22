const tokenService = require('./instance.token-service.js');
const LoginViewComponent =  require('./../components/login/component.login.js');
const SettingsViewComponent = require('./../components/settings/component.settings.js');
const AboutViewComponent = require('./../components/about/component.about.js');
const NavbarComponent = require('./../components/navbar/component.navbar.js');

/////////////////////////////////////// 
// Navigation guards
const authRequired = function(to, from, next){
	
	if (localStorage.token == undefined) {
		delete localStorage.name;
		delete localStorage.token;
		console.log("Localstorage token was undefined so this should be the last message");
		next('/');
	}

	let token = localStorage.token;
	// tokenService.verifyToken(token);
	next();
}

const authNotAllowed = function(to, from, next){
	next();
}

///////////////////////////////////////	
// Routes
module.exports = new VueRouter({
	routes: [

		// Home
		{
			path: '/',
			redirect: '/about',
		},
		
		// Login
		{
			path: '/login',
			name: 'login',
			component: LoginViewComponent,
      		beforeEnter: authNotAllowed
		}, 

	    // About
	    {
	      path: '/about',
	      name: 'about',
	      component: AboutViewComponent,
	    }, 

		// Settings
		{
			path: '/settings',
			name: 'settings',
			component: SettingsViewComponent,
	  		beforeEnter: authRequired
		}
	]
})