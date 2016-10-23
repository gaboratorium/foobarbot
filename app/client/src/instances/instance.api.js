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

		getStarWars: () => {

			var myPromise = new Promise((resolve, reject) => {
				Vue.http.get('http://swapi.co/api/starships/9/').then((response) => {
					console.log(response);
					resolve(response);
				}, (fail) => {
					console.log(fail);
					reject(fail);
				})
			})

			return myPromise;
		}
	}
})