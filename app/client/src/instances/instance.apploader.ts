/// <reference path="./../../../../node_modules/vue/types/index.d.ts" />
// Importing store
import { MainStore } from './../stores/store.main';
import { AppInstance } from './instance.app';

// App instance
export const AppLoaderInstance  = new Vue({
  name: "appLoader",
  store: MainStore,

  methods: {
    initApp: () => {
      console.log('Initialising Vuejs app...');
      var myApp = AppInstance;
    }
  },

  // Lifecycle hook
  created: function(){

    // If token or name is not set, unset user client
    var userToken = localStorage.userToken;
    var userName = localStorage.userName;
    
    if (userToken == undefined || userName == undefined) {
      MainStore.commit('unsetUserClient');
      this.initApp();
    }

    // If token and name is set, verify token
    MainStore.dispatch({type: 'verifyToken', token: userToken}).then((responseAsUserClient) => {
      console.log('Token has been verifyied during apploader');
      MainStore.commit('setUserClient', responseAsUserClient);
      this.initApp();
    }, (fail) => {
      MainStore.commit('unsetUserClient');
      this.initApp();
    });
  }
});