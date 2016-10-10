// Global paths for client
var globalPath = {
    dist : "app/client/dist/",
    src: "app/client/src/",
    npm : "node_modules/"
};

// Export paths
module.exports = {
    // Libraries
    libs: {
        // JavaScript Libraries
        js: [
            /* Polyfill(s) for IE */
            globalPath.npm+"core-js/client/shim.min.js",

            /* Reactive Extensions RxJS library */
            globalPath.npm+"zone.js/dist/zone.js",
            globalPath.npm+"reflect-metadata/Reflect.js",
            
            /* Angular */
            globalPath.npm+"rxjs/bundles/Rx.js",
            globalPath.npm+"@angular/core/bundles/core.umd.min.js",
            globalPath.npm+"@angular/common/bundles/common.umd.js",
            globalPath.npm+"@angular/compiler/bundles/compiler.umd.js",
            globalPath.npm+"@angular/platform-browser/bundles/platform-browser.umd.js",
            globalPath.npm+"@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
            
            
        ],

        // CSS Libraries
        css: [
            // Foundation for Apps...
            // Google Fonts...
            // Material icons...
        ]
    },

    // Source assets
    src: {
        root: globalPath.src,
        js: [

        ],
        ts: [
            // Typescript to compile...
            // globalPath.src + "**/app.helloworld.ts"
            // globalPath.src + "**/app.helloworld.ts"
            // globalPath.src + "app.ts"
            globalPath.src + "ts/*.ts"
        ],
        sass: [
            // Sass to compile...
        ]
    },

    // Target paths
    dist: {
        root: globalPath.dist,
        js: globalPath.dist + "js/",
        css: globalPath.dist + "css/",
    }
};
