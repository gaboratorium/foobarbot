const ApiInstance = require('./instance.api.js');

// Token store
module.exports = {
    actions: {
        // Recieves and forwards a token for verification
        // Resolves if token was verified succesfully, rejects if not.
        verifyToken: (context, payload) => {
        
            ApiInstance.postUserLog();

            var myUserToken = context.getters["mainstore/userToken"];

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

                var myUserEmail = payload.userEmail;
                var myUserPassword = payload.userPassword;


                ApiInstance.createToken(myUserEmail, myUserPassword).then((response) => {
                
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