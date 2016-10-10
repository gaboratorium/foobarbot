// http://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript

interface Window {
	app: any
}

// http://stackoverflow.com/questions/29915175/getting-error-cannot-find-name-angular
declare var ng: any;

((app) => {

	app.AppComponent =
		ng.core.Component({
		  selector: 'my-app',
		  template: '<h1>Hello World with Angular 2 and TypeScript</h1>'
		})
		.Class({
		  constructor: () => {
		  	// Constructor...
		  }
		});

})(window.app || (window.app = {}));