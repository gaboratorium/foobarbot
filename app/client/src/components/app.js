///////////////////////////////////////	
// Components
const LoginViewComponent =  require('./login/component.login.js');
const SettingsViewComponent = require('./settings/component.settings.js');
const AboutViewComponent = require('./about/component.about.js');
const NavbarComponent = require('./navbar/component.navbar.js');

/////////////////////////////////////// 
// Navigation guards
const checkToken = function(to, from, next){

  let userViews = ["settings"];
  let visitorViews = ["login", "about"];
  let requestedView = to.name

  if (_.includes(userViews, requestedView)) {
    console.log("You are going to a user view");
  }

  if (_.includes(visitorViews, requestedView)) {
    console.log("You are going to a visitor view");
  }

  next();
}

///////////////////////////////////////	
// Routes
const router = new VueRouter({
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

///////////////////////////////////////
// Check localStorage
if (localStorage.name == undefined || localStorage.token == undefined){
  delete localStorage.name;
  delete localStorage.token;
}

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
      name: "",
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

      this.$http.post('/api/token/create', data).then(
          function(response) {
            // success
            console.log("You have been authenticated as admin.");
            this.user.name = response.body.user.name;
            this.user.token = response.body.user.token;

            localStorage.setItem("token", this.user.token);
            localStorage.setItem("name", this.user.name);

            window.location="/#/about";
            location.reload();

          }, function(response){
            // fail
            console.log("Its not ok.", response);
          }
        );
    },

    verifyToken: function(token){
      // Send cookie to verification
      console.log("appcomponent authenticates", msg);

      let data = {
        token: token
      }

      this.$http.post('/api/token/verify', data).then(function(response){
        console.log(response);
      })
    },

    deleteToken: function(msg){
      console.log("You have been logged out");
      delete localStorage.token;
      delete localStorage.name;
      location.reload();  
    }
  },
  router
});