const ApiInstance = require('./instance.api.js');

module.exports = new Vuex.Store({

  // State
  state: {
    userData: {
      userToken: undefined,
      userName: undefined
    }
  },

  // Getters
  getters: {
    userName: state => {
      return state.userData.userName;
    },
    userToken: state => {
      return state.userData.userToken;
    }
  },

  // Actions - async calls
  actions: {
    getStarWars: (context, payload) => {
      ApiInstance.postUserLog();
      return ApiInstance.getStarWars();
    },

    // Verify Token
    verifyToken: (context, payload) => {
      ApiInstance.postUserLog();
      return ApiInstance.verifyToken(payload.token);
    }
  },

  // Mutations - sync calls to change the state
  mutations: {
    logoutUser: state => state.userData = {userToken: undefined, userName: undefined},
    loginUser: function(state, newUser) {
      state.userData = newUser;

    }
  }
})