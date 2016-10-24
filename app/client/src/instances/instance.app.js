// Importing Instances
const StoreInstance = require('./instance.store.js');
const RouterInstance = require('./instance.router.js');

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
  
  // Inject other instances
  router: RouterInstance,
  store: StoreInstance,

  // Properties
  data: {
  },

  // Components
  components: {
  	'login-view-component': LoginViewComponent,
    'settings-view-component': SettingsViewComponent,
  	'about-view-component': AboutViewComponent,
  	'navbar': NavbarComponent
  },

  // Created hook
  beforeCreate: function(){

    if (localStorage.token == undefined) {
      console.log('Token is undefined');
      // return;
    }

    // let myToken = localStorage.token;
    let myToken = "random-token-asd-1234";

    StoreInstance.dispatch({type: 'verifyToken', token: myToken}).then((response) => {
      // if ok, registerUserInStore
      console.log(response);
      
      // else do nothing
    })

    let newUser = {userToken: "myUserToken", userName: "myUserName"};
    StoreInstance.commit('loginUser', newUser);


  },

  // Methods
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

      StoreInstance.commit('increment');
      console.log(StoreInstance.state.count);
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
  }
});