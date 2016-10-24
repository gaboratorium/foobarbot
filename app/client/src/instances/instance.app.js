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
  router: RouterInstance,
  store: StoreInstance,
  data: {
  },

  // Components
  components: {
  	'login-view-component': LoginViewComponent,
    'settings-view-component': SettingsViewComponent,
  	'about-view-component': AboutViewComponent,
  	'navbar': NavbarComponent
  },

  // Lifecycle hook
  beforeCreate: function(){

    // If token or name is not set, unset user client
    var userToken = localStorage.userToken;
    var userName = localStorage.userName;
    if (userToken == undefined || userName == undefined) {
      StoreInstance.commit('unsetUserClient');
      return;
    }

    // If token and name is set, verify token
    StoreInstance.dispatch({type: 'verifyToken', token: userToken}).then((response) => {
      // console.log('App beforeCreate() -> store.verifyToken success: ', response);
    }, (fail) => {
      // console.log('App beforeCreate() -> store.verifyToken fail: ', fail);
    })
  }
});