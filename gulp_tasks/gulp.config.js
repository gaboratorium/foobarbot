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
            globalPath.npm+"moment/moment.js",
            globalPath.npm+"material-design-lite/material.min.js"
            // globalPath.npm+"highlight.js/lib/highlight.js"
        ],

        // Typescript definition types
        types: [
            globalPath.npm+"/vue/types/index.d.ts"
        ],

        // CSS Libraries
        css: [
            globalPath.npm+"foundation-apps/dist/css/foundation-apps.css",
            globalPath.npm+"material-design-lite/material.min.css",
            globalPath.npm+"highlight.js/styles/atom-one-dark.css"
            // globalPath.npm+"font-awesome/css/font-awesome.css"
            
            // Material icons...
        ]
    },

    // Source
    src: {
        root: globalPath.src,
        copy_index: globalPath.src + 'index.html',
        copy_assets: globalPath.src + 'assets/**/*.*',
        ts: [
            // TS files to compile. Order matters!

            // Components
            globalPath.src + "components/view.about/component.about.ts",
            globalPath.src + "components/view.login/component.login.ts",
            globalPath.src + "components/view.notifications/component.notifications.ts",
            globalPath.src + "components/view.settings/component.settings.ts",
            globalPath.src + "components/view.signup/component.signup.ts",
            globalPath.src + "components/view.user/component.user.ts",


            globalPath.src + "components/navbar/component.navbar.ts",
            globalPath.src + "components/appfooter/component.appfooter.ts",

            // Instances
            globalPath.src + "instances/instance.router.ts",
            globalPath.src + "instances/instance.api.ts",

            //Substores
            globalPath.src + "stores/store.notification.ts",
            globalPath.src + "stores/store.token.ts",
            globalPath.src + "stores/store.user.ts",

            // Main store
            globalPath.src + "stores/store.main.ts",

            // App and app loader
            globalPath.src + "instances/instance.app.ts",
            globalPath.src + "instances/instance.apploader.ts",

            // Main.ts
            globalPath.src + "main.ts",
        ],
        
        // JavaScript to watch
        js: [
            globalPath.src + "app.js",
            globalPath.src + "components/**/*.js",
            globalPath.src + "instances/**/*.js"
        ],

        // Sass to compile
        sass: [
            // globalPath.npm+"font-awesome/scss/font-awesome.scss",
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
