// Importing Components
import { AboutViewComponent } from './../components/about/component.about';
import { LoginViewComponent } from  './../components/login/component.login';
import { SignupViewComponent } from  './../components/signup/component.signup';
import { SettingsViewComponent } from './../components/settings/component.settings';
import { NotificationsViewComponent } from './../components/notifications/component.notifications';
import { NavbarComponent } from './../components/navbar/component.navbar';

declare var localStorage: any;
declare var VueRouter: any;

/////////////////////////////////////// 
// Navigation guards
const userClientRequired = function(to: any, from: any, next: any){
	if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
		next();
		return;
	}
	next('/about');
}	

const userClientForbidden = function(to: any, from: any, next: any){
	if (localStorage.userName !== undefined && localStorage.userToken !== undefined) {
		next('/about');
		return;
	}
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