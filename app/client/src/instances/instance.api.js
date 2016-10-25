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
		createToken: (userName, userPassword) => {
			var body = {name: userName, password: userPassword};
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('api/token/create', body).then((response) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				})
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
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				});
			});
			return myPromise;
		}
	}
})