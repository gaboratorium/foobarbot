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
var ensureAuthenticated = function(to, from, next){
  console.log('Navigation guard says not ok, go back to login...');
  next('/login');
}

var ensureNotAuthenticated = function(to, from, next){
  console.log('Navigation guard says ok...');
  next();
}


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
      beforeEnter: ensureNotAuthenticated
		}, 

		// Settings
		{
			path: '/settings',
			name: 'settings',
			component: SettingsViewComponent,
      beforeEnter: ensureAuthenticated
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
    users: [],
    user: {
      name: "Gabor"
    }
  },
  components: {
  	// View Components
  	'login-view-component': LoginViewComponent,
  	'settings-view-component': SettingsViewComponent,
  	// Components
  	'navbar': NavbarComponent
  },
  methods: {
  	authenticate: function(msg){
  		console.log("appcomponent authenticates", msg);
  	}
  },
  router
});

app.$on('test', function (msg){
  console.log(msg);
  console.log(this.userName);
})

app.$emit('test', 'hi');