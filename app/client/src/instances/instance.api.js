// Vue resource docs:
// https://github.com/vuejs/vue-resource/blob/master/docs/http.md

// List of shortcut methods:

// get(url, [options])
// head(url, [options])
// delete(url, [options])
// jsonp(url, [options])
// post(url, [body], [options])
// put(url, [body], [options])
// patch(url, [body], [options])

module.exports = new Vue({
	name: "Api",
	methods: {
		postUserLog: () => {
			// console.log("Logging user activity...");
		},

		// Verify token
		verifyToken: (myToken) => {
			var body = { token: myToken };
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('api/token/verify', body).then((response) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				})
			})
			return myPromise;
		},

		// Create token
		createToken: (myUserEmail, myUserPassword) => {
			var body = {userEmail: myUserEmail, userPassword: myUserPassword};
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('api/token/create', body).then((response) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});
			return myPromise;
		},

		loadUsers: (myToken) => {
			var options = { 
				headers: {
					'x-access-token': myToken
				} 
			};			
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.get('/api/users', options).then((response) => {
					resolve(response.body);

				}, (fail) => {
					reject(fail);
				})
			})
			return myPromise;
		},
		
		getNotifications: (myUserToken, myUserEmail) => {

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
				Vue.http.get('/api/notifications', options).then((response) => {
					console.log('api getnotifications receives:', response);
					resolve(response.body);
				}, (fail) => {
					console.log('api getnotifications fails', fail);
					
					reject(fail);
				});
			});
			return myPromise;
		},

		postNotification: (myToken, myUserEmail, myMessage) => {
			
			var body = {
				userEmail: myUserEmail,
				token: myToken,
				notificationMessage: myMessage
			};

			console.log('api instance creates this body:', body);
			

			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('/api/notifications', body).then((response) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});
			return myPromise;
		},

		deleteNotification: (myUserEmail, myToken) => {
			var body = {
				token: myToken,
				userEmail: myUserEmail
			};
			
			var options = {
				headers: { 'x-access-token': myToken },
				body: body
			};
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.delete('/api/notifications', options).then((response) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});
			return myPromise;
		},

		signupUser: (myUserName, myUserEmail, myUserPassword) => {
			var body = {
				userName: myUserName,
				userEmail: myUserEmail,
				userPassword: myUserPassword
			};

			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('/api/users/', body).then((response) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});

			return myPromise;
		}
	}
})