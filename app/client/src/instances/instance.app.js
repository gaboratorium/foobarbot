// Instances
const RouterInstance = require('./instance.router.js');
const tokenService = require('./instance.token-service.js');

// Components
const LoginViewComponent =  require('./../components/login/component.login.js');
const SettingsViewComponent = require('./../components/settings/component.settings.js');
const AboutViewComponent = require('./../components/about/component.about.js');
const NavbarComponent = require('./../components/navbar/component.navbar.js');

// App instance
module.exports = new Vue({
  el: '#app',
  name: "myVueApp",
  data: {
  	debug: true,
    user: {
      name: "",
      token: ""
    }
  },
  components: {
  	'login-view-component': LoginViewComponent,
    'settings-view-component': SettingsViewComponent,
  	'about-view-component': AboutViewComponent,
  	'navbar': NavbarComponent
  },
  methods: {
    createToken: function(name, password){
      tokenService.createToken(name, password);
      // Do some logic
    },

    verifyToken: function(token){
      tokenService.verifyToken(token);
      // Do some logic
    },

    deleteToken: function(msg){
      tokenService.deleteToken(token);
      delete localStorage.token;
      delete localStorage.name;
    }
  },
  router: RouterInstance
});