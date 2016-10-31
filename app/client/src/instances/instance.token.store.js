const ApiInstance = require('./instance.api.js');

// Token store
module.exports = {

    // Get data from rootState (main store)
    getters: {
        "tokenstore/userName" : (state, getters, rootState) => { return rootState.userClient.userName; },
        "tokenstore/userEmail" : (state, getters, rootState) => { return rootState.testsign; },
        "tokenstore/userToken": (state, getters, rootState) => { return rootState.userClient.userToken; }
    },

    actions: {
        // Recieves and forwards a token for verification
        // Resolves if token was verified succesfully, rejects if not.
        verifyToken: (context, payload) => {
        
        ApiInstance.postUserLog();

        var myUserToken = context.getters.userToken;

        var myPromise = new Promise((resolve, reject) => {
            ApiInstance.verifyToken(myUserToken).then((response) => {
            
            if (!response.success) {
                context.commit('unsetUserClient');
                reject();
            }
            
            let userClient = response.userClient;

            context.commit('setUserClient', userClient);
            resolve();
            }, (fail) => {
            context.commit('unsetUserClient');
            reject(fail);
            })
        })
        return myPromise;
        },

        // Recieves and forwards a name and password for token creation
        // Resolves if user and pw were correct and token was created
        // Saves token to state and localStorage
        createToken: (context, payload) => {

        console.log('Create token in token store has been called....');
        


        // ApiInstance.postUserLog();
        var myPromise = new Promise((resolve, reject) => {

            var myUserEmail = context.getters["tokenstore/userEmail"];

            console.log('token store gets this user client email:', myUserEmail);

            ApiInstance.createToken(myUserEmail, payload.userPassword).then((response) => {
            
            let userClient = response.userClient;

            context.commit('setUserClient', userClient);
            resolve();
            }, (fail) => {
            // fail
            context.commit('unsetUserClient');
            reject(fail);
            })
        })
        
        return myPromise;
        }
    }
}