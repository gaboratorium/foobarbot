// Reads userName and userToken from localStorage
// If one is missing, deletes both
// If token is incorrect, deletes both
// If token is ok, then it's ok
// Please not that this is an async call,
// so app gets initialized before this (unfortunately)

// Importing store
import { MainStore } from './../stores/store.main';
declare var localStorage: any;

// App instance
export const AppLoaderInstance  = new Vue({
  name: "appLoader",
  store: MainStore,

  // Lifecycle hook
  beforeCreate: function(){

    // If token or name is not set, unset user client
    var userToken = localStorage.userToken;
    var userName = localStorage.userName;
    
    if (userToken == undefined || userName == undefined) {
      MainStore.commit('unsetUserClient');
    }

    // If token and name is set, verify token
    MainStore.dispatch({type: 'verifyToken', token: userToken}).then((responseAsUserClient: any) => {
      MainStore.commit('setUserClient', responseAsUserClient);
    }, (fail: any) => {
      MainStore.commit('unsetUserClient');
    });
  }
});