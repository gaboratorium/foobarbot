const tokenService = require('./instance.token-service.js');
const LoginViewComponent =  require('./../components/login/component.login.js');
const SettingsViewComponent = require('./../components/settings/component.settings.js');
const AboutViewComponent = require('./../components/about/component.about.js');
const NavbarComponent = require('./../components/navbar/component.navbar.js');

/////////////////////////////////////// 
// Navigation guards
const checkToken = function(to, from, next){

	tokenService.verifyToken("bla bla bla");

  let userViews = ["settings"];
  let visitorViews = ["login", "about"];
  let requestedView = to.name

  

  if (_.includes(userViews, requestedView)) {
  }

  if (_.includes(visitorViews, requestedView)) {
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
      		beforeEnter: checkToken
		}, 

    // About
    {
      path: '/about',
      name: 'about',
      component: AboutViewComponent,
      beforeEnter: checkToken
    }, 

		// Settings
		{
			path: '/settings',
			name: 'settings',
			component: SettingsViewComponent,
      beforeEnter: checkToken
		}
	]
})