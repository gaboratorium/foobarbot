// app.js
// Initialises the application and sets the routing options

window.onload  = function(){
	
	///////////////////////////////////////	
	// Create router
	var importedFoo = require('./foo.js');
	const Foo = {
		template: importedFoo
	}

	var importedBarBar = require('./barbar.js');
	
	const Bar = {
		template: importedBarBar
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