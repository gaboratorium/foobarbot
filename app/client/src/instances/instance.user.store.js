const ApiInstance = require('./instance.api.js');

// User store
module.exports = {
    actions: {
        // Get a list of users
        loadUsers: (context, payload) => {

        var myUserToken = context.getters.userToken;
        
        ApiInstance.postUserLog();
        return ApiInstance.loadUsers(myUserToken);
        },

        // Sign up user
        signupUser: (context, payload) => {

        var myUserName = context.getters.userName;
        var myUserEmail = context.getters.userEmail;

        return ApiInstance.signupUser(payload.userName, payload.userEmail, payload.userPassword);
        }
    }
}