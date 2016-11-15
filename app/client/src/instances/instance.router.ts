// Importing Components
import { AboutViewComponent } from './../components/about/component.about';
import { LoginViewComponent } from  './../components/login/component.login';
import { SignupViewComponent } from  './../components/signup/component.signup';

// User view components
import { UserViewComponent } from  './../components/user/component.user';
import { UserSnippetsComponent } from  './../components/user/component.user.snippets';
import { UserStarsComponent } from  './../components/user/component.user.stars';
import { UserCommentsComponent } from  './../components/user/component.user.comments';


import { SettingsViewComponent } from './../components/settings/component.settings';
import { NotificationsViewComponent } from './../components/notifications/component.notifications';
import { SnippetViewComponent } from './../components/snippet/component.snippet';
import { DiscoverViewComponent } from './../components/discover/component.discover';
import { SearchViewComponent } from './../components/search/component.search';

// Non view components
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
			redirect: '/discover',
		},

		// Discover
	    {
	      path: '/discover',
	      name: 'discover',
	      component: DiscoverViewComponent,
		  canReuse: false
	    }, 

		// Search
	    {
	      path: '/search/:searchtext',
	      name: 'search',
	      component: SearchViewComponent,
		  canReuse: false
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

		// Snippet 
		{
			path: '/snippet/:id',
			name: 'snippet',
			component: SnippetViewComponent
		},

		// Signup
		{
			path: '/signup',
			name: 'signup',
			component: SignupViewComponent,
      		beforeEnter: userClientForbidden
		},

		// User profile
		{
			path: '/user/:id',
			name: 'user',
			redirect: '/user/:id/snippets',
			component: UserViewComponent,
			children: [
				{
					path: 'snippets',
					component: UserSnippetsComponent
				},
				{
					path: 'stars',
					component: UserStarsComponent
				},
				{
					path: 'comments',
					component: UserCommentsComponent
				}
			]
		}, 

		// Settings
		{
			path: '/settings',
			name: 'settings',
			component: SettingsViewComponent,
	  		beforeEnter: userClientRequired
		},

		// Notifications
		{
			path: '/notifications',
			name: 'notifications',
			component: NotificationsViewComponent,
	  		beforeEnter: userClientRequired
		},

		// 404
		{
			path: '/:anythingElse',
			name: '404',
			redirect: '/about'
		},
	]
});