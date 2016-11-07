const AboutViewComponent = require('./../components/about/component.about.js');
const LoginViewComponent =  require('./../components/login/component.login.js');
const SettingsViewComponent = require('./../components/settings/component.settings.js');
const NotificationsViewComponent = require('./../components/notifications/component.notifications.js');
const NavbarComponent = require('./../components/navbar/component.navbar.js');

/////////////////////////////////////// 
// Navigation guards
const userClientRequired = function(to, from, next){
	console.log('Visiting a view where authentication is required...');
	if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
		console.log('View access granted');
		next();
		return;
	}
	console.log('View access denied. You are not logged in.');
	next('/about');
}	

const userClientForbidden = function(to, from, next){
	console.log('Visiting a view where authentication is forbidden...');
	if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
		console.log('View access denied. You are logged in.');
		next('/about');
		return;
	}
	console.log('View access granted.');
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

		  // About
	    {
	      path: '/about',
	      name: 'about',
	      component: AboutViewComponent,
	    }, 
		
		// Login
		{
			path: '/login',
			name: 'login',
			component: LoginViewComponent,
      		beforeEnter: userClientForbidden
		}, 

		// Settings
		{
			path: '/settings',
			name: 'settings',
			component: SettingsViewComponent,
	  		beforeEnter: userClientRequired
		},

		// Settings
		{
			path: '/notifications',
			name: 'notifications',
			component: NotificationsViewComponent,
	  		beforeEnter: userClientRequired
		},
	]
});