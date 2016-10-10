// http://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript

interface Window {
	app: any
}

// http://stackoverflow.com/questions/29915175/getting-error-cannot-find-name-angular
declare var ng: any;

((app) => {

	app.AppModule = 
		ng.core.NgModule({
			imports: [ ng.platformBrowser.BrowserModule ],
			declarations: [ app.AppComponent ],
			bootstrap: [ app.AppComponent ]
		})
		.Class({
			constructor: () => {
				// Constructor
			}
		});

})(window.app || (window.app = {}))