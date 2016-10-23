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
		}
	}
})