const ApiInstance = require('./instance.api.js');

module.exports = new Vuex.Store({

  // State
  state: {
    userClient: {
      userName: undefined,
      userToken: undefined
    }
  },

  // Getters
  getters: {
    userName: state => {
      return state.userClient.userName;
    },
    userToken: state => {
      return state.userClient.userToken;
    }
  },

  // Gets a spaceship from a Star Wars universe
  actions: {
    getStarWars: (context, payload) => {
      ApiInstance.postUserLog();
      return ApiInstance.getStarWars();
    },

    // Recieves and forwards a token for verification
    // Resolves if token was verified succesfully, rejects if not.
    verifyToken: (context, payload) => {
      
      ApiInstance.postUserLog();
      var myPromise = new Promise((resolve, reject) => {
        ApiInstance.verifyToken(payload.token).then((response) => {
          
          if (!response.success) {
            context.commit('unsetUserClient');
            reject();
          }
          
          let userClient = response.userClient;

          context.commit('setUserClient', userClient);
          resolve();
        }, (fail) => {
          context.commit('unsetUserClient');
          reject(fail);
        })
      })
      return myPromise;
    },

    // Recieves and forwards a name and password for token creation
    // Resolves if user and pw were correct and token was created
    // Saves token to state and localStorage
    createToken: (context, payload) => {
      ApiInstance.postUserLog();
      var myPromise = new Promise((resolve, reject) => {
        ApiInstance.createToken(payload.userName, payload.userPassword).then((response) => {
          
          let userClient = response.userClient;

          context.commit('setUserClient', userClient);
          resolve();
        }, (fail) => {
          // fail
          context.commit('unsetUserClient');
          reject(fail);
        })
      })
      
      return myPromise;
    },

    // Get a list of users
    loadUsers: (context, payload) => {
      ApiInstance.postUserLog();
      return ApiInstance.loadUsers(payload.token);
    },

    // Get list of notifications
    getNotifications: (context, payload) => {
      ApiInstance.postUserLog();
      var userName = context.getters.userName; // should be userId
      var userToken = context.getters.userToken;
      return ApiInstance.getNotifications(userName, userToken);
    },

    // Post notifications
    postNotification: (context, payload) => {
      ApiInstance.postUserLog();
      var userName = context.getters.userName; // should be userId
      var userToken = context.getters.userToken;
      return ApiInstance.postNotification(userName, userToken, payload.notificationMessage);
    },

    // Delete all notifications
    deleteNotification: (context, payload) => {
      ApiInstance.postUserLog();
      var userName = context.getters.userName;
      var userToken = context.getters.userToken;
      return ApiInstance.deleteNotification(userName, userToken);
    },

    // Sign up user
    signupUser: (context, payload) => {
      return ApiInstance.signupUser(payload.userName, payload.userEmail, payload.userPassword);
    }
  },
  // end of actions
  // Mutations - sync calls to change the state
  mutations: {

    // Set up new userClient
    setUserClient: function(state, userClient) {
      localStorage.userName = userClient.userName;
      localStorage.userToken = userClient.userToken;
      state.userClient = {userToken: userClient.userToken, userName: userClient.userName};
      console.log('Succesfully logged in as ', userClient.userName);
      
      
    },
    
    // Resetting userClient
    unsetUserClient: function(state) {
      delete localStorage.userName;
      delete localStorage.userToken;
      state.userClient = {userToken: undefined, userName: undefined};
      console.log('User logged out.');
    }
  }
})