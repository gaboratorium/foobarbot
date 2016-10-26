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
		// Get a starwars ship
		getStarWars: () => {
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.get('http://swapi.co/api/starships/9/').then((response) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				})
			})
			return myPromise;
		},

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
		
		getNotifications: (userId, myToken) => {
			var options = { 
				headers: {
					'x-access-token': myToken
				} 
			};
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.get('/api/users/' + userId + '/notifications', options).then((response) => {
					console.log('api receives:', response);
					
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});
			return myPromise;
		},

		postNotification: (userName, myToken, myMessage) => {
			var body = {name: userName, token: myToken, message: myMessage};
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('/api/users/' + userName + '/notifications', body).then((response) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});
			return myPromise;
		},

		deleteNotification: (myUserName, myToken) => {
			var body = {token: myToken};
			var options = {
				headers: { 'x-access-token': myToken },
				body: body
			};
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.delete('/api/users/' + myUserName + '/notification', options).then((response) => {
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