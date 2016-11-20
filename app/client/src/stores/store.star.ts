import { ApiInstance } from './../instances/instance.api';

// Snippet store
export const StarStore = {
    actions: {
        // Get list of snippets, all or by user
        postStar: (context: any, payload: any) => {
            var userToken = context.getters["mainstore/userToken"]; // should be userId
            var snippetId = payload.snippetId;
            var snippet = payload.snippet;

            ApiInstance.postUserLog();
            return ApiInstance.postStar(userToken, snippetId);
        },

        starSnippetFromExternalApi: (context: any, payload: any) => {
            // stuff
            console.log("star snippet from external api in store star fired, recieved this snippet", payload.snippet);
            
        }
    }
}