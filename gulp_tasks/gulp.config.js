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
            globalPath.npm+"vue-resource/dist/vue-resource.js",
            globalPath.npm+"vuex/dist/vuex.js",

            /* Other libs */
            globalPath.npm+"lodash/lodash.js",
            globalPath.npm+"moment/moment.js"
        ],

        // CSS Libraries
        css: [
            globalPath.npm+"foundation-apps/dist/css/foundation-apps.css"
            // Material icons...
        ]
    },

    // Source
    src: {
        root: globalPath.src,
        copy_index: globalPath.src + 'index.html',
        copy_assets: globalPath.src + 'assets/**/*.*',
        browserify: [
            // Browserify entry point to bundle
            globalPath.src + "main.js"
        ],
        // JavaScript to watch
        js: [
            globalPath.src + "capp.js",
            globalPath.src + "components/**/*.js",
            globalPath.src + "instances/**/*.js"
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
