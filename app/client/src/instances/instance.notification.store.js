const ApiInstance = require('./instance.api.js');

// Notification store
module.exports = {
    actions: {
        // Get list of notifications
        getNotifications: (context, payload) => {

        ApiInstance.postUserLog();
        var userToken = context.getters.userToken; // should be userId
        var userEmail = context.getters.userEmail; // should be userId
        console.log('store calls apiinstance getnotifications with userclient');
        
        return ApiInstance.getNotifications(userToken, userEmail);
        },

        // Post notifications
        postNotification: (context, payload) => {
        ApiInstance.postUserLog();
        var userToken = context.getters.userToken; // should be userId
        var userEmail = context.getters.userEmail; // should be userId
        return ApiInstance.postNotification(userToken, userEmail, payload.notificationMessage);
        },

        // Delete all notifications
        deleteNotification: (context, payload) => {
        ApiInstance.postUserLog();
        var userEmail = context.getters.userEmail;
        console.log('store deletenotifications gets this email', userEmail);
        
        var userToken = context.getters.userToken;
        return ApiInstance.deleteNotification(userEmail, userToken);
        }
    }
}