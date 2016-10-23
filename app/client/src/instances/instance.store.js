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
    increment: (context, payload) => {

      var myPromise = new Promise((resolve, reject) => {
        ApiInstance.sayHello().then((data) => {
          console.log('store recieves this data: ', data);
          resolve(data);
        }, (fail) => {
          console.log(fail);
          reject()
        });
      })

      return myPromise;
    },

    getStarWars: (context, payload) => {
      return new Promise((resolve, reject) => {
        this.$http.get('http://swapi.co/api/starships/9/').then((response) => {
          resolve(response);
        }, (fail) => {
          reject();
        })
      })
    }
  },

  // Mutations - sync calls to change the state
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  }
})