import { ApiInstance } from './../instances/instance.api';

// Token store
export const TokenStore = {
    actions: {
        // Expects and forwards a token (payload.token) for verification
        // Resolves and returns userClient obj if token verification was succesful
        verifyToken: (context, payload) => {
            
            // Log request
            ApiInstance.postUserLog();

            // Send verification
            var myUserToken = payload.token;
            var myPromise = new Promise((resolve, reject) => {
                ApiInstance.verifyToken(myUserToken).then((response) => {
                
                // Rejects if not succesful
                if (!response.success) {
                    reject();
                }
                
                // Resolves and returns userClient if succesful
                resolve(response.userClient);

                // Rejects if request fails
                }, (fail) => {
                    reject(fail);
                })
            })

            // Return promise
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
                    console.log('token store create token gets this userClient response', response.userClient);                    

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