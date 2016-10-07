// // COMMENTCOMMENT
// import { Component } from '@angular/core';
// @Component({
//   selector: 'my-app',
//   template: '<h1>My First Angular App</h1>'
// })
// export class AppComponent { }

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var App = (function () {
    function App() {
        this.name = 'Angular2';
    }
    App = __decorate([
        Component({
            selector: 'my-app',
            template: "\n    <div>\n      <h2>Hello {{name}}</h2>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;

// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app.module';
// const platform = platformBrowserDynamic();
// platform.bootstrapModule(AppModule);

// import { NgModule }      from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// @NgModule({
//   imports:      [ BrowserModule ],
// })
// export class AppModule { }

// class Greeter {
//     constructor(public greeting: string) { }
//     greet() {
//         return "<h1>" + this.greeting + "</h1>";
//     }
// };
// var greeter = new Greeter("Hello, world!");
// document.getElementById('container').innerHTML = greeter.greet(); 
