// // COMMENTCOMMENT
// import { Component } from '@angular/core';
// @Component({
//   selector: 'my-app',
//   template: '<h1>My First Angular App</h1>'
// })
// export class AppComponent { }

var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return "<h1>" + this.greeting + "</h1>";
    };
    return Greeter;
}());
;
var greeter = new Greeter("Hello, world!");
// document.body.innerHTML = greeter.greet();
console.log("Hello World");

// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app.module';
// const platform = platformBrowserDynamic();
// platform.bootstrapModule(AppModule);

// import { NgModule }      from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppComponent } from './app.component';
// @NgModule({
//   imports:      [ BrowserModule ],
//   declarations:      [ AppComponent  ],
//   bootstrap:      [ AppComponent  ],
// })
// export class AppModule { }
