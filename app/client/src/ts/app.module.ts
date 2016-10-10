((app) => {

	app.AppModule = 
		ng.core.NgModule({
			imports: [ ng.platformBrowser.BrowserModule ],
			declarations [ app.AppComponent ],
			bootstrap: [ app.AppComponent ]
		})
		.Class({
			constructor: () => {
				// Constructor
			}
		});

})(window.app || (window.app = {}))