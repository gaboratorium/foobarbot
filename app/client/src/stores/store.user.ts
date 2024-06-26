import { ApiInstance } from './../instances/instance.api';
// declare var ApiInstance: any;

// const ApiInstance = require("./../instances/instance.api")


// User store
export const UserStore = {
    actions: {
        // Get a list of users
        loadUsers: (context: any, payload: any) => {
            var myUserToken = context.getters["mainstore/userToken"];
            ApiInstance.postUserLog();
            return ApiInstance.loadUsers(myUserToken);
        },

        // Sign up user
        signupUser: (context: any, payload: any) => {

            var myUserName = context.getters["mainstore/userName"];
            var myUserEmail = context.getters["mainstore/userEmail"];

            return ApiInstance.signupUser(payload.userName, payload.userEmail, payload.userPassword);
        },

        deleteUser: (context: any, payload: any) => {
            var myToken = context.getters["mainstore/userToken"];
            return ApiInstance.deleteUser(myToken);
        },

        // Get user
        getUser: (context: any, payload: any) => {
            // var myPromise = new Promise((resolve: any, reject: any) => {
            //     resolve({userName: payload.userId});
            // });

            // return myPromise;

            return ApiInstance.getUser(payload.userId);
        }
    }
}