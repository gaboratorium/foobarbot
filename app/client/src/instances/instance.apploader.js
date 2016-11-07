// Importing store
const StoreInstance = require('./../stores/store.main.js');

// App instance
module.exports = new Vue({
  name: "appLoader",
  store: StoreInstance,

  methods: {
    initApp: () => {
      console.log('Initialising Vuejs app...');
      var myApp = require('./instance.app.js');
    }
  },

  // Lifecycle hook
  created: function(){

    // If token or name is not set, unset user client
    var userToken = localStorage.userToken;
    var userName = localStorage.userName;
    
    if (userToken == undefined || userName == undefined) {
      StoreInstance.commit('unsetUserClient');
      this.initApp();
    }

    // If token and name is set, verify token
    StoreInstance.dispatch({type: 'verifyToken', token: userToken}).then((responseAsUserClient) => {
      console.log('Token has been verifyied during apploader');
      StoreInstance.commit('setUserClient', responseAsUserClient);
      this.initApp();
    }, (fail) => {
      StoreInstance.commit('unsetUserClient');
      this.initApp();
    });
  }
});