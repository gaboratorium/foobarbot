const LoginViewComponent =  require('./../components/login/component.login.js');
const SettingsViewComponent = require('./../components/settings/component.settings.js');
const AboutViewComponent = require('./../components/about/component.about.js');
const NavbarComponent = require('./../components/navbar/component.navbar.js');

/////////////////////////////////////// 
// Navigation guards
const userClientRequired = function(to, from, next){
	console.log('userClientRequired');
	if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
		next();
		return;
	}
	next('/about');
}	

const userClientForbidden = function(to, from, next){
	console.log('userClinetForbidden');
	if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
		next('/about');
		return;
	}
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
      		beforeEnter: userClientForbidden
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
	  		beforeEnter: userClientRequired
		}
	]
})