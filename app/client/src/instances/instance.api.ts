
interface IApiInstance {
	// These are implemented as methods not properties,
	// so this buildup should be changed into a class module

	// User methods
	postUserLog?: any,
	signupUser?: any
	loadUsers?: any,
	getUser?: any,

	// Token methods
	verifyToken?: any,
	createToken?: any,

	// Notification methods
	getNotifications?: any,
	postNotification?: any,
	deleteNotification?: any,
}

export const ApiInstance: IApiInstance= new Vue({
	name: "Api",
	methods: {
		postUserLog: () => {
			// console.log("Logging user activity...");
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

			console.log('api get notifications http req options', options);
			
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.get('/api/notifications', options).then((response: any) => {
					console.log('api getnotifications receives:', response);
					resolve(response.body);
				}, (fail) => {
					console.log('api getnotifications fails', fail);
					
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

			console.log('api instance creates this body:', body);
			

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
				snippet: mySnippet
			}

			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('/api/snippets/', body).then((response: any) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});

			return myPromise;
		}
	}
}) as IApiInstance;