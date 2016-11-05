// Importing the router instance and main store
import { RouterInstance } from './instance.router';
import { MainStore } from './../stores/store.main';

// View Components
import { AboutViewComponent } from './../components/about/component.about';
import { LoginViewComponent } from  './../components/login/component.login';
import { SignupViewComponent } from  './../components/signup/component.signup';
import { SettingsViewComponent } from './../components/settings/component.settings';
import { NotificationsViewComponent } from './../components/notifications/component.notifications';

// Other components
import { NavbarComponent } from './../components/navbar/component.navbar';
import { AppfooterComponent } from './../components/appfooter/component.appfooter';
import { ComposeModalComponent } from './../components/composemodal/component.composemodal';

// App instance
export const AppInstance = new Vue({
  
  // Instance options
  el: '#app',
  name: "myVueApp",
  router: RouterInstance,
  store: MainStore,

  data: {
    showModal: false
  },

  created: function() {
    console.log("AppInstance has been created");
  },

  // Components
  components: {
  	'about-view-component': AboutViewComponent,
  	'login-view-component': LoginViewComponent,
  	'signup-view-component': SignupViewComponent,
    'settings-view-component': SettingsViewComponent,
    'notifications-view-component': NotificationsViewComponent,
  	'navbar': NavbarComponent,
  	'appfooter': AppfooterComponent,
  	'modal': ComposeModalComponent
  }
});