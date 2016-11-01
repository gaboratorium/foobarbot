// Importing the router instance and main store
import { RouterInstance } from './instance.router';
import { MainStore } from './../stores/store.main';

// Importing Components
import { AboutViewComponent } from './../components/about/component.about';
import { LoginViewComponent } from  './../components/login/component.login';
import { SignupViewComponent } from  './../components/signup/component.signup';
import { SettingsViewComponent } from './../components/settings/component.settings';
import { NotificationsViewComponent } from './../components/notifications/component.notifications';
import { NavbarComponent } from './../components/navbar/component.navbar';

// App instance
export const AppInstance = new Vue({
  
  // Instance options
  el: '#app',
  name: "myVueApp",
  router: RouterInstance,
  store: MainStore,

  // Components
  components: {
  	'about-view-component': AboutViewComponent,
  	'login-view-component': LoginViewComponent,
  	'signup-view-component': SignupViewComponent,
    'settings-view-component': SettingsViewComponent,
    'notifications-view-component': NotificationsViewComponent,
  	'navbar': NavbarComponent
  }
});