const ApiInstance = require('./../instances/instance.api.js');

// User store
export const UserStore = {
    actions: {
        // Get a list of users
        loadUsers: (context, payload) => {
            var myUserToken = context.getters["mainstore/userToken"];
            ApiInstance.postUserLog();
            return ApiInstance.loadUsers(myUserToken);
        },

        // Sign up user
        signupUser: (context, payload) => {

            var myUserName = context.getters["mainstore/userName"];
            var myUserEmail = context.getters["mainstore/userEmail"];

            return ApiInstance.signupUser(payload.userName, payload.userEmail, payload.userPassword);
        }
    }
}