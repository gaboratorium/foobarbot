import { ApiInstance } from './../instances/instance.api';

// Snippet store
export const StarStore = {
    actions: {
        // Get list of snippets, all or by user
        postStar: (context: any, payload: any) => {
            var userToken = context.getters["mainstore/userToken"]; // should be userId
            console.log("star store has this usertoken", userToken);
            
            var snippetId = payload.snippetId;
            ApiInstance.postUserLog();
            return ApiInstance.postStar(userToken, snippetId);
        }
    }
}