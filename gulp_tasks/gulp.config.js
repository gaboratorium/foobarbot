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
            /* Angular */
            /* Angular: Polyfill(s) for older browsers */
            globalPath.npm+"core-js/client/shim.min.js",
            /* Angular: Other Angular stuff */
            globalPath.npm+"zone.js/dist/zone.js",
            globalPath.npm+"reflect-metadata/Reflect.js",
            globalPath.npm+"systemjs/dist/system.src.js"
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
            // client'app/app.component.js'></script>
            // <script src='app/app.module.js'></script>
            // <script src='app/main.js'></script>

        ],
        ts: [
            // Typescript to compile...
            globalPath.src + "**/*.ts"
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
