///////////////////////////////////////	
// Components
const LoginViewComponent =  require('./login/component.login.js');
const SettingsViewComponent = require('./settings/component.settings.js');
const AboutViewComponent = require('./about/component.about.js');
const NavbarComponent = require('./navbar/component.navbar.js');

/////////////////////////////////////// 
// Navigation guards
const checkToken = function(to, from, next){
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
    createToken: function(name, password){

      let data = {
        name: name,
        password: password
      };

      this.$http.post('/api/authenticate', data).then(
          function(response) {
            // success
            console.log("You have been authenticated as admin.");
            this.user.name = response.body.user.name;
            this.user.token = response.body.user.token;

            localStorage.setItem("token", this.user.token);
            localStorage.setItem("name", this.user.name);

          }, function(response){
            // fail
            console.log("Its not ok.", response);
          }
        );
    },

  	verifyToken: function(msg){
      // Send cookie to verification
  		console.log("appcomponent authenticates", msg);
  	},

    deleteToken: function(msg){
      console.log("You have been logged out");
      delete localStorage.token;

    }
  },
  router
});