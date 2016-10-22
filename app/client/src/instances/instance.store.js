module.exports = new Vuex.Store({
  // state management pattern
  // state
  state: {
    count: 0
  },

  // view
  //template: <div>{{count}}</div>

  // actions
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  }
})