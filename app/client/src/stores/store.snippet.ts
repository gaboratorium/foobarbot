import { ApiInstance } from './../instances/instance.api';

// Snippet store
export const SnippetStore = {
    actions: {
        // Get list of snippets, all or by user
        getSnippets: (context: any, payload: any) => {
            var userId = payload.userId;
            // var userToken = context.getters["mainstore/userToken"]; // should be userId
            // var userEmail = context.getters["mainstore/userEmail"]; // should be userId
            // ApiInstance.postUserLog();
            if (payload.snippetsMaxNumber && payload.searchText){
                
                return ApiInstance.getSnippets(userId, payload.snippetsMaxNumber, payload.searchText);
            } else {
                return ApiInstance.getSnippets(userId);
            }
        },

        getSnippetsFromGithub: (context: any, payload: any) => {
            return ApiInstance.getSnippetsFromGithub();
        },

        // Get a snippet
        getSnippet: (context: any, payload: any) => {
            var snippetId = payload.snippetId;
            return ApiInstance.getSnippet(snippetId);
        },

        // Post notifications
        postSnippet: (context: any, payload: any) => {
            var userToken = context.getters["mainstore/userToken"]; // should be userId
            var snippet = payload.snippet;
            ApiInstance.postUserLog();
            return ApiInstance.postSnippet(userToken, snippet);
            
        },

        // Delete all notifications
        deleteSnippet: (context: any, payload: any) => {
        // var userEmail = context.getters["mainstore/userEmail"];
        // var userToken = context.getters["mainstore/userToken"];
        // ApiInstance.postUserLog();
        // return ApiInstance.deleteNotification(userEmail, userToken);
        }
    }
}