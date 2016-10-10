// http://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript

interface Window {
	app: any
}

// http://stackoverflow.com/questions/29915175/getting-error-cannot-find-name-angular
declare var ng: any;

((app) => {

	document.addEventListener('DOMContentLoaded', () => {
	    ng.platformBrowserDynamic
	      .platformBrowserDynamic()
	      .bootstrapModule(app.AppModule);
	  });

})(window.app || (window.app = {}))