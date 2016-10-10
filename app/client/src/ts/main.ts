((app) => {

	document.addEventListener('DOMContentLoaded', () => {
	    ng.platformBrowserDynamic
	      .platformBrowserDynamic()
	      .bootstrapModule(app.AppModule);
	  });

})(window.app || (window.app = {}))