// Importing Instances
const RouterInstance = require('./instance.router.js');
const TokenService = require('./instance.token-service.js');

// Importing Components
const LoginViewComponent =  require('./../components/login/component.login.js');
const SettingsViewComponent = require('./../components/settings/component.settings.js');
const AboutViewComponent = require('./../components/about/component.about.js');
const NavbarComponent = require('./../components/navbar/component.navbar.js');

// App instance
module.exports = new Vue({

  // Instance options
  el: '#app',
  name: "myVueApp",
  data: {
    resultPackage: {},    
    user: {
      name: "",
      token: ""
    },
    csencs: ""
  },

  // Instance components
  components: {
  	'login-view-component': LoginViewComponent,
    'settings-view-component': SettingsViewComponent,
  	'about-view-component': AboutViewComponent,
  	'navbar': NavbarComponent
  },

  // Instance methods
  methods: {

    createResultPackage(isSuccessful, package, message){
      console.log("Building result package....");
      let resultPackage = {isSuccessful, package, message}
      this.resultPackage = resultPackage;
      return resultPackage;
    },

    createToken: function(name, password){
      let data = {
        name: name,
        password: password
      };


      this.$http.post('/api/token/create', data).then(
          function(response) {
            console.log(response);
            this.resultPackage = this.createResultPackage(true, null, "You have logged in succesfully.");
            RouterInstance.push('about');

            this.user.name = response.body.user.name;
            this.user.token = response.body.user.token;

            localStorage.name = this.user.name;
            localStorage.token = this.user.token;

            this.csencs = "Aj szi no csencsesz";

          }, function(err){
            console.log(err);
            this.resultPackage = this.createResultPackage(false, null, "User name or password was wrong.");
          }
        );
    },

    verifyToken: function(token){
      
      data = {
        token: token
      }

      this.$http.post('/api/token/verify', data).then(
          function(response) {
            this.feedbackMessage = "Yay, good credentials!";

          }, function(err){
            this.feedbackMessage = "Boo, bad credentials!"
          }
        );
    },

    deleteToken: function(msg){
      TokenService.deleteToken(token);
      delete localStorage.token;
      delete localStorage.name;
    },

    receiveResponse: function(response){
      console.log("App got this response", response);
    }
  },

  // Instance router
  router: RouterInstance
});