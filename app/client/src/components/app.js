// Init vue
window.onload  = function(){
	
	// Create router
	const Foo = {
		template: '<div>foo</div>'
	}

	const Bar = {
		template: '<div>bar</div>'
	}

	const routes = [
		{ path: '/foo', component: Foo },
		{ path: '/bar', component: Bar }
	]

	const router = new VueRouter({
		routes
	})

	// Init Vue app
	var app = new Vue({
	  el: '#app',
	  data: {
	    message: 'Hello Vue, how you doin\'?'
	  },
	  router
	}).$mount('#app');

}