const ApiInstance = require('./instance.api.js');

// User store
module.exports = {
    actions: {
        // Get a list of users
        loadUsers: (context, payload) => {
        ApiInstance.postUserLog();
        return ApiInstance.loadUsers(payload.token);
        },

        // Sign up user
        signupUser: (context, payload) => {
        return ApiInstance.signupUser(payload.userName, payload.userEmail, payload.userPassword);
        }
    }
}