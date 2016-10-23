const ApiInstance = require('./instance.api.js');

module.exports = new Vuex.Store({
  // state management pattern
  // state
  state: {
    count: 0,
    snippets: ['typescript', 'coffescript', 'typescript', 'c#', 'delphi']
  },

  // Get a variaton of state
  getters: {
    firstTwoLanguages: state => {
      return [ state.snippets[0], state.snippets[1] ];
    }
  },

  // Actions - async calls
  actions: {
    getStarWars: (context, payload) => {
      ApiInstance.postUserLog();
      return ApiInstance.getStarWars();
    }
  },

  // Mutations - sync calls to change the state
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  }
})