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
            if (payload.snippetsMaxNumber){
                return ApiInstance.getSnippets(userId, payload.snippetsMaxNumber);
            } else {
                return ApiInstance.getSnippets(userId);
            }
        },

        getStarredSnippets: (context: any, payload: any) => {
            var userId = payload.userId;
            if (payload.snippetsMaxNumber && payload.searchText){
                return ApiInstance.getStarredSnippets(userId, payload.snippetsMaxNumber);
            } else {
                return ApiInstance.getStarredSnippets(userId);
            }
        },

        getSnippetsFromGithub: (context: any, payload: any) => {
            var myPromise = new Promise((resolve, reject) => {
                ApiInstance.getSnippetsFromGithub().then((response: any) =>{

                    // Simulate search by shuffling results
                    response = _.shuffle(response);

                    // Array of snippets will be resolved if succeed
                    // gistCodeLinks is a list of strings containing URLs for the codes
                    var maxNumber = 10;
                    var snippets: Array<any> = [];
                    var getGistCodePromises: Array<Promise<any>> = [];
                    var gistCodes: Array<string> = [];

                    // Transform GitHub Gist to Foobarbot Snippet
                    // Assign the corresponding properties + fetch code from URL
                    for (var i = 0; i < maxNumber; i++) {

                        // Gists contain multiple files
                        // We pick the first one for now
                        var gist = response[i];
                        var keys = Object.keys(gist.files);
                        var gistCodeLink = gist.files[keys[0]].raw_url;

                        // Assigning corresponding values
                        var readme: any = gist.description ? gist.description: "*No readme was provided*";
                        var userId: any = gist.owner ? gist.owner.login : "Unknown";
                        var userUrl: any = gist.owner ? gist.owner.html_url : "";
                        
                        // Create snippet object
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

                        // Create a promise to get gistCode from gistCodeLink
                        var getGistCode = new Promise((resolve, reject) => {
                            Vue.http.get(gistCodeLink).then((response: any) => {
                                resolve(response.body);
                            }, (fail: any) => {
                                console.log("Getting Gist code fails", fail);
                                reject(fail);
                            })
                        });

                        snippets.push(snippet);
                        getGistCodePromises.push(getGistCode);
                    }

                    console.log("Snippets length", snippets.length);
                    console.log("gistCodeLinks length", getGistCodePromises.length);
                    

                    // Get all gist codes from gistcode links, resolve when all finished
                    // reject if one fials
                    Promise.all(getGistCodePromises).then((gistCodes) => {
                        
                        for (var i = 0; i < snippets.length; i++) {

                            snippets[i].snippetCode = gistCodes[i];
                        }

                        // This resolve corresponds to the parent promise
                        // not the current one
                        resolve(snippets);
                    }, (fail) => {
                        // Same with this
                        console.log("Getting one of the Gist Codes failed, therefore everything fails.", fail);
                        reject(fail);
                    })

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