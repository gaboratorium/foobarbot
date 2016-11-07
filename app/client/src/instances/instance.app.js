// Importing Instances
const StoreInstance = require('./instance.store.js');
const RouterInstance = require('./instance.router.js');

// Importing Components
const AboutViewComponent = require('./../components/about/component.about.js');
const LoginViewComponent =  require('./../components/login/component.login.js');
const SettingsViewComponent = require('./../components/settings/component.settings.js');
const NotificationsViewComponent = require('./../components/notifications/component.notifications.js');
const NavbarComponent = require('./../components/navbar/component.navbar.js');

// App instance
module.exports = new Vue({
  
  // Instance options
  el: '#app',
  name: "myVueApp",
  router: RouterInstance,
  store: StoreInstance,

  // Components
  components: {
  	'about-view-component': AboutViewComponent,
  	'login-view-component': LoginViewComponent,
    'settings-view-component': SettingsViewComponent,
    'notifications-view-component': NotificationsViewComponent,
  	'navbar': NavbarComponent
  }
});