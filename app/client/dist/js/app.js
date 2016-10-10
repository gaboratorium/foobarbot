(function (app) {
    app.AppComponent =
        ng.core.Component({
            selector: 'my-app',
            template: '<h1>Hello World</h1>'
        })
            .Class({
            constructor: function () {
                // Constructor...
            }
        });
})(window.app || (window.app = {}));

(function (app) {
    app.AppModule =
        ng.core.NgModule({
            imports: [ng.platformBrowser.BrowserModule],
            declarations: [app.AppComponent],
            bootstrap: [app.AppComponent]
        })
            .Class({
            constructor: function () {
                // Constructor
            }
        });
})(window.app || (window.app = {}));

(function (app) {
    document.addEventListener('DOMContentLoaded', function () {
        ng.platformBrowserDynamic
            .platformBrowserDynamic()
            .bootstrapModule(app.AppModule);
    });
})(window.app || (window.app = {}));
