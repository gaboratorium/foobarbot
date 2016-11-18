
interface IApiInstance {
	// These are implemented as methods not properties,
	// so this buildup should be changed into a class module

	// User methods
	postUserLog?: any,
	signupUser?: any
	loadUsers?: any,
	getUser?: any,
	deleteUser?: any,

	// Token methods
	verifyToken?: any,
	createToken?: any,

	// Notification methods
	getNotifications?: any,
	postNotification?: any,
	deleteNotification?: any,

	// Snippet methods
	postSnippet?: any,
	getSnippets?: any,
	getSnippetsFromGithub?: any,
	getSnippet?: any,

	// Star methods
	postStar?: any
}

export const ApiInstance: IApiInstance= new Vue({
	name: "Api",
	methods: {
		postUserLog: () => {
		},

		// Verify token
		verifyToken: (myToken: any) => {
			var body = { token: myToken };
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('api/token/verify', body).then((response: any) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				})
			})
			return myPromise;
		},

		// Create token
		createToken: (myUserEmail: any, myUserPassword: any) => {
			var body = {userEmail: myUserEmail, userPassword: myUserPassword};
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('api/token/create', body).then((response: any) => {
					resolve(response.body);
				}, (fail: any) => {
					reject(fail);
				});
			});
			return myPromise;
		},

		loadUsers: (myToken: any) => {
			var options = { 
				headers: {
					'x-access-token': myToken
				} 
			};			
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.get('/api/users', options).then((response: any) => {
					resolve(response.body);

				}, (fail) => {
					reject(fail);
				})
			})
			return myPromise;
		},

		getUser: (myUserId: any) => {
			var myPromise = new Promise((resolve, reject) => {

				// Send requested user ID as parameter
				var options = {
					params: {
						userId: myUserId
					}
				};

				// Make HTTP request
				Vue.http.get('/api/user', options).then((response: any) => {
					resolve(response.body);
				}, (fail: any) => {
					reject(fail);
				})
			})

			return myPromise;
		},

		deleteUser: (myToken: any) => {

			var body = {
				token: myToken,
			};
			
			var options = {
				headers: { 'x-access-token': myToken },
				body: body
			};

			var myPromise = new Promise((resolve, reject) => {
				Vue.http.delete('/api/user', options).then((response: any) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				})
			})

			return myPromise;
		},
		
		getNotifications: (myUserToken: any, myUserEmail: any) => {

			var options = { 
				params: {
					userEmail: myUserEmail,
					paramfoo: 'parambar'
				},
				headers: {
					'x-access-token': myUserToken
				}
			};

			
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.get('/api/notifications', options).then((response: any) => {
					resolve(response.body);
				}, (fail) => {
					
					reject(fail);
				});
			});
			return myPromise;
		},

		postNotification: (myToken: any, myUserEmail: any, myMessage: any) => {
			
			var body = {
				userEmail: myUserEmail,
				token: myToken,
				notificationMessage: myMessage
			};

			

			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('/api/notifications', body).then((response: any) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});
			return myPromise;
		},

		deleteNotification: (myUserEmail: any, myToken: any) => {
			var body = {
				token: myToken,
				userEmail: myUserEmail
			};
			
			var options = {
				headers: { 'x-access-token': myToken },
				body: body
			};
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.delete('/api/notifications', options).then((response: any) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});
			return myPromise;
		},

		signupUser: (myUserName: any, myUserEmail: any, myUserPassword: any) => {
			var body = {
				userName: myUserName,
				userEmail: myUserEmail,
				userPassword: myUserPassword
			};

			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('/api/users/', body).then((response: any) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});

			return myPromise;
		},

		postSnippet: (myToken: any, mySnippet: any) => {
			var body = {
				snippet: mySnippet,
				token: myToken
			}

			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('/api/snippets/', body).then((response: any) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});

			return myPromise;
		},

		// Get all snippets or all by user
		getSnippets: (myUserId?: string, mySnippetsMaxNumber?: number, mySearchText?: string) => {
			var options = { params: {}};	
			if (myUserId){
				options = {
						params: {
							userId: myUserId,
						}
					};
			}

			if (mySnippetsMaxNumber){
				options.params.snippetsMaxNumber = mySnippetsMaxNumber;
			}

			if (mySearchText) {
				options.params.searchText = mySearchText;
			}

			
			
			var myPromise = new Promise((resolve, reject) => {
				// Make HTTP request
				Vue.http.get('/api/snippets', options).then((response: any) => {
					resolve(response.body.snippets);
				}, (fail: any) => {
					reject(fail);
				})
			});

			return myPromise;
		},

		getSnippetsFromGithub: () => {
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.get("https://api.github.com/gists/public").then((response: any) => {
					resolve(response.body);
				}, (fail: any) => {
					reject(fail);
				})
			})
			return myPromise;
		},

		// Get snippet by Id
		getSnippet: (mySnippetId: string) => {
		
			var options = {
				params: {
					snippetId: mySnippetId
				}
			};
		
			
			var myPromise = new Promise((resolve, reject) => {
				// Make HTTP request
				Vue.http.get('/api/snippets', options).then((response: any) => {
					resolve(response.body.snippets);
				}, (fail: any) => {
					reject(fail);
				})
			});

			return myPromise;
		},

		postStar: (userToken: string, snippetId: string) => {
			var body = {
				snippetId: snippetId,
				userToken: userToken
			}

			

			var myPromise = new Promise((resolve, reject) => {
				// Make HTTP request
				Vue.http.post('/api/stars', body).then((response: any) => {
					resolve(response.body.stars);
				}, (fail: any) => {
					reject(fail);
				})
			});

			return myPromise;
		}
	}
}) as IApiInstance;