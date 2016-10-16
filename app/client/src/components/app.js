// app.js
// Initialises the application and sets the routing options

window.onload  = function(){
	
	///////////////////////////////////////	
	// Create router
	const Foo = {
		template: '<h1>foo</h1>'
	}

	const Bar = {
		template: '<h1>barbar</h1>'
	}

	const router = new VueRouter({
		routes: [
			{
				path: '/foo',
				name: 'foo',
				component: Foo
			},
			{
				path: '/bar',
				name: 'bar',
				component: Bar
			}
		]
	})

	///////////////////////////////////////
	// Init Vue app
	var app = new Vue({
	  el: '#app',
	  data: {
	    message: 'Hello Vue, how you doin\'?'
	  },
	  router
	}).$mount('#app');

}