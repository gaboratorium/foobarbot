///////////////////////////////////////	
// Components
const LoginViewComponent =  require('./login/component.login.js');
const SettingsViewComponent = require('./settings/component.settings.js');
const NavbarComponent = require('./navbar/component.navbar.js');

/////////////////////////////////////
// Instances
var authenticator = new Vue({
  name: "authenticator",
  data: {

  },
  method: {
    authenticate: function(){
      console.log("Authenticator's authenticate is used");
    }
  }
});

/////////////////////////////////////// 
// Navigation guards


///////////////////////////////////////	
// Routes
const router = new VueRouter({
	routes: [

		// Home
		{
			path: '/',
			redirect: '/login',
		},
		
		// Login
		{
			path: '/login',
			name: 'login',
			component: LoginViewComponent,
      beforeEnter: function(to, from, next) {
        // Navigation guard...
        console.log('Navigation guard says ok...');
        next();
      }
		}, 

		// Settings
		{
			path: '/settings',
			name: 'settings',
			component: SettingsViewComponent,
      beforeEnter: function(to, from, next) {
        // Navigation guard...
        console.log('Navigation guard says not ok, go back to login...');
        next('/login');
      }
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
  	userName: "Gabor",
    message: 'Hello Vue, how you doin\'?',
    userToken: '',
    users: []
  },
  components: {
  	// View Components
  	'login-view-component': LoginViewComponent,
  	'settings-view-component': SettingsViewComponent,
  	// Components
  	'navbar': NavbarComponent
  },
  methods: {
  	authenticate: function(){
  		console.log("appcomponent authenticates");
  	}
  },
  router
}).$mount('#app');