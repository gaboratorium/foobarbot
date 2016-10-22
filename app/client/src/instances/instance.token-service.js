// Services should be one instance
// with multiple components...

module.exports = new Vue({
  name: "tokenService",
  data: {

  },
  methods: {
    verifyToken: function(token){
  		console.log("I am veryfing the token...", token);
    	
  		data = {
  			token: token
  		}

    	// this.$http.post('/api/token/verify', data).then(
     //      function(response) {
     //        // success
     //        console.log("You token is ok");
     //        location.reload();

     //      }, function(err){
     //        console.log("Your token is not ok", err);
     //      }
     //    );
    },

    createToken: function(name, password){

    	let data = {
    		name: name,
    		password: password
    	}

    	this.$http.post('/api/token/create', data).then(
    		function(response){
    			console.log("Request was ok", response.body);
    			this.$emit('send-response', response.body);
    		},
    		function(err){
    			console.log(err);
    			console.log("Response body", err.body);
    			this.$emit('send-response', response.body);
    		}
    	);
    },

    deleteToken: function(token){
    	// do something
    },

    receiveResponse: function(response){
      console.log("App got this response", response);
    }
  }
});

