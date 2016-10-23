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
    increment: (context, payload) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('increment');
          resolve(context.state.count);
        }, 1500)
      })
    }
  },

  // Mutations - sync calls to change the state
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  }
})