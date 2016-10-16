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
        copy_index: globalPath.src + 'index.html',
        copy_assets: globalPath.src + 'assets/**/*.*',
        js: [
            // JavaScript to concat
            globalPath.src + "app.js"
        ],
        ts: [
            // Typescript to compile...
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
        assets: globalPath.dist + "assets/"
    }
};
