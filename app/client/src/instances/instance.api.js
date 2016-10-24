module.exports = new Vue({
	name: "Api",
	methods: {
		sayHello: () => {
			var data = "secretData from api";
			return new Promise((resolve, reject) => {
				setTimeout(()=>{
					resolve(data);
				}, 1500);
			})
		},

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
			console.log("Logging user activity...");
		},

		// Verify token
		verifyToken: (token) => {
			var body = { token: token };
			var myPromise = new Promise((resolve, reject) => {
				Vue.http.post('api/token/verify', body).then((response) => {
					resolve(response.body);
				}, (fail) => {
					reject(fail);
				})
			})
			return myPromise;
		}
	}
})