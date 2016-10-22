// Instances
const RouterInstance = require('./instance.router.js');
const TokenService = require('./instance.token-service.js');

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
    resultPackage: {},    
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

    createResultPackage(statusCode, package, message){
      console.log("Building result package....");
      let resultPackage = {statusCode, package, message}
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
            this.resultPackage = this.createResultPackage(200, null, "OK");

          }, function(err){
            console.log(err);
            this.resultPackage = this.createResultPackage(500, null, "Not ok");
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
  router: RouterInstance
});