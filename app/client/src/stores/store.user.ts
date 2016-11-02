import { ApiInstance } from './../instances/instance.api';

// User store
export const UserStore = {
    actions: {
        // Get a list of users
        loadUsers: (context, payload) => {
            console.log("store.user loadUsers is fired");
            
            var myUserToken = context.getters["mainstore/userToken"];

            console.log("store.user gets this userToken:", myUserToken);
            console.log("store.user has this apiInstance:", ApiInstance);
            
            
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