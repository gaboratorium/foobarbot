// http://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
(function (app) {
    app.AppComponent =
        ng.core.Component({
            selector: 'my-app',
            template: '<h1>Hello World with Angular 2 and TypeScript</h1>'
        })
            .Class({
            constructor: function () {
                // Constructor...
            }
        });
})(window.app || (window.app = {}));

// http://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
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

// http://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
(function (app) {
    document.addEventListener('DOMContentLoaded', function () {
        ng.platformBrowserDynamic
            .platformBrowserDynamic()
            .bootstrapModule(app.AppModule);
    });
})(window.app || (window.app = {}));
