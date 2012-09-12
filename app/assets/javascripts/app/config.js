// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  //deps: ["main"],
  baseUrl: "/assets/app/",
  paths: {
    // JavaScript folders.
    libs: "../libs",
    plugins: "../plugins",

    // Libraries.
    jquery: "../libs/jquery",
    lodash: "../libs/lodash",
    backbone: "../libs/backbone",
    bootstrap_typeahead: "../libs/bootstrap-typeahead"
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },
    '../libs/bootstrap-typeahead': ['jquery'],
    // Backbone.LayoutManager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"],
    "plugins/backbone.localStorage": ["backbone"]
  }

});
