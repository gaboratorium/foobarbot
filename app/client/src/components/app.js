///////////////////////////////////////	
// Components
const LoginViewComponent =  require('./login/components.login.js');
const SettingsViewComponent = require('./settings/components.settings.js');
const NavbarComponent = require('./navbar/components.navbar.js');

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
			component: LoginViewComponent
		}, 

		// Settings
		{
			path: '/settings',
			name: 'settings',
			component: SettingsViewComponent
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