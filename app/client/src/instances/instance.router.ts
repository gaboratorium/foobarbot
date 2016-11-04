/// <reference path="./../../../../node_modules/vue-router/types/index.d.ts" />
// Importing Components
import { AboutViewComponent } from './../components/about/component.about';
import { LoginViewComponent } from  './../components/login/component.login';
import { SignupViewComponent } from  './../components/signup/component.signup';
import { SettingsViewComponent } from './../components/settings/component.settings';
import { NotificationsViewComponent } from './../components/notifications/component.notifications';
import { NavbarComponent } from './../components/navbar/component.navbar';

declare var localStorage: any;
declare var VueRouter: any;

console.log("router instance recieves this loginvewcomponent", LoginViewComponent);


/////////////////////////////////////// 
// Navigation guards
const userClientRequired = function(to: any, from: any, next: any){
	console.log('Visiting a view where authentication is required...');
	if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
		console.log('View access granted');
		next();
		return;
	}
	console.log('View access denied. You are not logged in.');
	next('/about');
}	

const userClientForbidden = function(to: any, from: any, next: any){
	console.log('Visiting a view where authentication is forbidden...');
	if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
		console.log('View access denied. You are logged in.');
		next('/about');
		return;
	}
	console.log('View access granted.');
	next();
}

///////////////////////////////////////	
// Routes
export const RouterInstance = new VueRouter({
	routes: [

		// Home
		{
			path: '/',
			redirect: '/about',
		},

		  // About
	    {
	      path: '/about',
	      name: 'about',
	      component: AboutViewComponent,
	    }, 
		
		// Login
		{
			path: '/login',
			name: 'login',
			component: LoginViewComponent,
      		beforeEnter: userClientForbidden
		},

		// Signup
		{
			path: '/signup',
			name: 'signup',
			component: SignupViewComponent,
      		beforeEnter: userClientForbidden
		}, 

		// Settings
		{
			path: '/settings',
			name: 'settings',
			component: SettingsViewComponent,
	  		beforeEnter: userClientRequired
		},

		// Settings
		{
			path: '/notifications',
			name: 'notifications',
			component: NotificationsViewComponent,
	  		beforeEnter: userClientRequired
		},
	]
});