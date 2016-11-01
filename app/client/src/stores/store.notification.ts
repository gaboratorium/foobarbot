const ApiInstance = require('./../instances/instance.api.js');

// Notification store
export const NotificationStore = {
    actions: {
        // Get list of notifications
        getNotifications: (context, payload) => {
            var userToken = context.getters["mainstore/userToken"]; // should be userId
            var userEmail = context.getters["mainstore/userEmail"]; // should be userId
            ApiInstance.postUserLog();
            return ApiInstance.getNotifications(userToken, userEmail);
        },

        // Post notifications
        postNotification: (context, payload) => {
            var userToken = context.getters["mainstore/userToken"]; // should be userId
            var userEmail = context.getters["mainstore/userEmail"]; // should be userId
            ApiInstance.postUserLog();
            return ApiInstance.postNotification(userToken, userEmail, payload.notificationMessage);
        },

        // Delete all notifications
        deleteNotification: (context, payload) => {
        var userEmail = context.getters["mainstore/userEmail"];
        var userToken = context.getters["mainstore/userToken"];
        ApiInstance.postUserLog();
        return ApiInstance.deleteNotification(userEmail, userToken);
        }
    }
}