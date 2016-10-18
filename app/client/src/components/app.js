///////////////////////////////////////	
// Components
const LoginComponent =  require('./login/components.login.js');
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
    users: []
  },
  components: {
  	'login-component': LoginComponent,
  	'settings-component': SettingsComponent,
  },
  methods: {
  	
  },
  router
}).$mount('#app');