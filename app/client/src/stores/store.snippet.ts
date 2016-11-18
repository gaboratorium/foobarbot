import { ApiInstance } from './../instances/instance.api';
var _ = require('lodash');

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
            var myPromise = new Promise((resolve, reject) => {
                ApiInstance.getSnippetsFromGithub().then((response: any) =>{

                    response = _.shuffle(response);
                    console.log("Github gists:", response);

                    // Transform GitHub Gists to snippets
                    var maxNumber = 10;
                    var snippets: Array<any> = [];
                    for (var i = 0; i < maxNumber; i++) {
                        var gist = response[i];
                        
                        var keys = Object.keys(gist.files);
                        var gistCodeLink = gist.files[keys[0]].raw_url;

                        var readme: any = gist.description ? gist.description: "*No readme was provided*";
                        var userId: any = gist.owner ? gist.owner.login : "Unknown";
                        var userUrl: any = gist.owner ? gist.owner.html_url : "";
                        
                        var snippet: any = {
                            snippetId: gist.id,
                            snippetCode: gistCodeLink,
                            snippetUrl: gist.html_url,
                            userId: userId,
                            userUrl: userUrl,
                            tag1: "github",
                            tag2: "searchresult",
                            tag3: "batman",
                            readme: readme
                        };

                        snippets.push(snippet);
                    }
                    resolve(snippets);
                }, (fail: any) => {
                    // Fail
                    console.log("Snippet store fails from getsnippetsfromgithub", fail);
                    reject(fail);
                })
            })
            return myPromise;
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