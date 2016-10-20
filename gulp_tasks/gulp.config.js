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
            /* Vue */
            globalPath.npm+"vue/dist/vue.js",
            globalPath.npm+"vue-router/dist/vue-router.js",
            globalPath.npm+"vue-resource/dist/vue-resource.js"
        ],

        // CSS Libraries
        css: [
            globalPath.npm+"foundation-apps/dist/css/foundation-apps.css"
            // Material icons...
        ]
    },

    // Source assets
    src: {
        root: globalPath.src,
        copy_index: globalPath.src + 'index.html',
        copy_assets: globalPath.src + 'assets/**/*.*',
        browserify: [
            // Browserify entry point to bundle
            globalPath.src + "components/app.js"
        ],
        // JavaScript to watch
        js: [
            globalPath.src + "components/**/*.js"
        ],
        ts: [
            // Typescript to compile...
        ],
        sass: [
            globalPath.src + "sass/**/*.scss"
        ]
    },

    // Target paths
    dist: {
        root: globalPath.dist,
        js: globalPath.dist + "js/",
        css: globalPath.dist + "css/",
        assets: globalPath.dist + "assets/"
    }
};
