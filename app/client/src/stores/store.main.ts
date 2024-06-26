// Main store
// Import other stores as modules
// Communicates with App Components and the Api instance

// Importing the Api and other stores
import { TokenStore } from "./store.token";
import { NotificationStore } from "./store.notification";
import { UserStore } from "./store.user";
import { SnippetStore } from "./store.snippet";
import { StarStore } from "./store.star";

// No DT typings
// import * as Vuex from "vuex";
declare var localStorage: any;
declare var Vuex: any

// Main store with modularized actions
export const MainStore = new Vuex.Store({

  // State
  state: {
    userClient: {
      userToken: undefined,
      userId: undefined,
      userEmail: undefined,
      userName: undefined
    },
  },

  // Modules
  modules: {
    tokenModule: TokenStore,
    notificationModule: NotificationStore,
    userModule: UserStore,
    snippetModule: SnippetStore,
    starModule: StarStore
  },

  // Getters
  getters: {
    "mainstore/userToken": (state: any) => { return state.userClient.userToken; },
    "mainstore/userId": (state: any) => { return state.userClient.userId; },
    "mainstore/userEmail": (state: any) => { return state.userClient.userEmail; },
    "mainstore/userName": (state: any) => { return state.userClient.userName; },
    "mainstore/userClient": (state: any) => { return state.userClient; },
    "mainstore/isUserLoggedIn": (state: any) => { 
      if ( state.userClient.userName !== undefined && state.userClient.userEmail !== undefined && state.userClient.userToken !== undefined && state.userClient.userId) {
        return true;
      } else {
        if (state.userClient.userToken !== undefined) console.log("state.userClient.userToken is undefined.");
        if (state.userClient.userId !== undefined) console.log("state.userClient.userId is undefined.");
        if (state.userClient.userEmail !== undefined) console.log("state.userClient.userEmail is undefined.");
        if (state.userClient.userName !== undefined) console.log("state.userClient.userName is undefined.");
        return false;
      }
    }
  },

  // Mutations - sync calls to change the state
  mutations: {

    // Set up new userClient
    setUserClient: function(state: any, userClient: any) {

      console.log('main store setUserClient gets this userClient', userClient);
      
      
      // Save user name and token to local storage 
      localStorage.userName = userClient.userName;
      localStorage.userToken = userClient.userToken;

      // Update state
      state.userClient = {
        userToken: userClient.userToken, 
        userId: userClient.userId,
        userEmail: userClient.userEmail,
        userName: userClient.userName
      };
    },
    
    // Resetting userClient
    unsetUserClient: function(state: any) {
      
      // Delete user name nad token from local storage
      delete localStorage.userName;
      delete localStorage.userToken;

      // Update state
      state.userClient = {
        userToken: undefined,
        userId: undefined,
        userEmail: undefined,
        userName: undefined
      };
    }
  }
});