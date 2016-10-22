///////////////////////////////////////	
// Components
const LoginViewComponent =  require('./login/component.login.js');
const SettingsViewComponent = require('./settings/component.settings.js');
const AboutViewComponent = require('./about/component.about.js');
const NavbarComponent = require('./navbar/component.navbar.js');

/////////////////////////////////////// 
// Navigation guards
const checkToken = function(to, from, next){

  if (true){
    next();
  } else {
    next('/login');
  }
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
      beforeEnter: checkToken
		}, 

    // About
    {
      path: '/about',
      name: 'about',
      component: AboutViewComponent
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
      name: "Alfred",
      token: ""
    }
  },
  components: {
  	// View Components
  	'login-view-component': LoginViewComponent,
    'settings-view-component': SettingsViewComponent,
  	'about-view-component': AboutViewComponent,
  	// Components
  	'navbar': NavbarComponent
  },
  methods: {
    createToken: function(userName, password){

      this.$http.get('/api/users', { headers: {'x-access-token': userName}}).then(
          function(response) {
            // success
            console.log("Here you go.", response);
          }, function(response){
            // fail
            console.log("Sorry, only administrators can get the list of users.", response);
          }
        );
    },

  	verifyToken: function(msg){
      // Send cookie to verification
  		console.log("appcomponent authenticates", msg);
  	},

    deleteToken: function(msg){
      // Send cookie to delete token
      // and delete cookie
      console.log("User logging out...", msg);
    }
  },
  router
});