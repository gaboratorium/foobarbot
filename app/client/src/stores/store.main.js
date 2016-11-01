// Main store
// Import other stores as modules
// Communicates with App Components and the Api instance

// Importing the Api and other stores
const TokenStore = require('./store.token.js');
const NotificationStore = require('./store.notification.js');
const UserStore = require('./store.user.js');

// Main store with modularized actions
module.exports = new Vuex.Store({

  // State
  state: {
    userClient: {
      userName: undefined,
      userEmail: undefined,
      userToken: undefined
    },
  },

  // Modules
  modules: {
    tokenModule: TokenStore,
    notificationModule: NotificationStore,
    userModule: UserStore
  },

  // Getters
  getters: {
    "mainstore/userName": state => { return state.userClient.userName; },
    "mainstore/userEmail": state => { return state.userClient.userEmail; },
    "mainstore/userToken": state => { return state.userClient.userToken; },
    "mainstore/userClient": state => { return state.userClient; }
    },

  // Mutations - sync calls to change the state
  mutations: {

    // Set up new userClient
    setUserClient: function(state, userClient) {
      
      // Save user name and token to local storage 
      localStorage.userName = userClient.userName;
      localStorage.userToken = userClient.userToken;

      // Update state
      state.userClient = {
        userToken: userClient.userToken, 
        userName: userClient.userName,
        userEmail: userClient.userEmail
      };
    },
    
    // Resetting userClient
    unsetUserClient: function(state) {
      
      // Delete user name nad token from local storage
      delete localStorage.userName;
      delete localStorage.userToken;

      // Update state
      state.userClient = {
        userToken: undefined,
        userName: undefined,
        userEmail: undefined
      };
    }
  }
});