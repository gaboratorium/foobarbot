import { ApiInstance } from './../instances/instance.api';

// const ApiInstance = require("./../instances/instance.api")
// declare var ApiInstance: any;
// import * as ApiInstance from './../instances/instance.api';

// Notification store
export const NotificationStore = {
    actions: {
        // Get list of notifications
        getNotifications: (context: any, payload: any) => {
            var userToken = context.getters["mainstore/userToken"]; // should be userId
            var userEmail = context.getters["mainstore/userEmail"]; // should be userId
            ApiInstance.postUserLog();
            return ApiInstance.getNotifications(userToken, userEmail);
        },

        // Post notifications
        postNotification: (context: any, payload: any) => {
            var userToken = context.getters["mainstore/userToken"]; // should be userId
            var userEmail = context.getters["mainstore/userEmail"]; // should be userId
            ApiInstance.postUserLog();
            return ApiInstance.postNotification(userToken, userEmail, payload.notificationMessage);
        },

        // Delete all notifications
        deleteNotification: (context: any, payload: any) => {
        var userEmail = context.getters["mainstore/userEmail"];
        var userToken = context.getters["mainstore/userToken"];
        ApiInstance.postUserLog();
        return ApiInstance.deleteNotification(userEmail, userToken);
        }
    }
}