module.exports = new Vue({
  name: "tokenService",
  data: {

  },
  methods: {
    verifyToken: function(token){
      console.log("I am veryfing the token...", token);
            // this.$http.post('/api/token/create', data).then(
      //     function(response) {
      //       // success
      //       console.log("You have been authenticated as admin.");
      //       this.user.name = response.body.user.name;
      //       this.user.token = response.body.user.token;

      //       localStorage.setItem("token", this.user.token);
      //       localStorage.setItem("name", this.user.name);

      //       window.location="/#/about";
      //       location.reload();

      //     }, function(response){
      //       // fail
      //       console.log("Its not ok.", response);
      //     }
      //   );
    },

    createToken: function(name, password){
    	// do something
    },

    deleteToken: function(token){
    	// do something
    }
  }
});

