define([
  // Libraries.
  "jquery",
  "lodash",
  "backbone",
  "../libs/bootstrap-typeahead",
  // Plugins.
  "plugins/backbone.layoutmanager",
  "plugins/backbone.localStorage"
],

function($, _, Backbone) {

  // Provide a global location to place configuration settings and module
  // creation.
  var app = {
    // The root path to run the application.
    root: "/"
  };

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  // Configure LayoutManager with Backbone Boilerplate defaults.
  Backbone.LayoutManager.configure({
    paths: {
      layout: "templates/layouts/",
      template: "templates/"
    },
    manage:true,
    fetch: function(path) {
      path = path + ".html";

      if (!JST[path]) {
        $.ajax({ url: app.root + path, async: false, cache:false }).then(function(contents) {
          JST[path] = _.template(contents);
        });
      } 
      
      return JST[path];
    }
  });

//     Backbone.Rails.js
//
//     Makes Backbone.js play nicely with the default Rails setup, i.e.,
//     no need to set
//       ActiveRecord::Base.include_root_in_json = false
//     and build all of your models directly from `params` rather than
//     `params[:model]`.
//
//     Load this file after backbone.js and before your application JS.
//
// Modified to add Rails3 CSRF support!


  Backbone.RailsJSON = {
    // In order to properly wrap/unwrap Rails JSON data, we need to specify
    // what key the object will be wrapped with.
    _name : function() {
      if (!this.name) throw new Error("A 'name' property must be specified");
      return this.name;
    },

    // A test to indicate whether the given object is wrapped.
    isWrapped : function(object) {
      if(typeof(args) != 'undefined'){
        return (object.hasOwnProperty(this._name()) &&
            (typeof(object[this._name()]) == "object"));
      }
    },

    // Extracts the object's wrapped attributes.
    unwrappedAttributes : function(object) {
      var name = this._name();
      if(object && object[name]){
        return object[name];
      }else{
        return object;
      }
    },

    // Wraps the model's attributes under the supplied key.
    wrappedAttributes : function() {
      var object = new Object;
      object[this._name()] = _.clone(this.attributes);
      return object;
    },

    // Sets up the new model's internal state so that it matches the
    // expected format. Should be called early in the model's constructor.
    maybeUnwrap : function(args) {
      if (this.isWrapped(args)) {
        this.set(this.unwrappedAttributes(args), { silent: true });
        this.unset(this._name(), { silent: true });
        this._previousAttributes = _.clone(this.attributes);
      }
    }
  };

  _.extend(Backbone.Model.prototype, Backbone.RailsJSON, {
    // This is called on all models coming in from a remote server.
    // Unwraps the given response from the default Rails format.
    parse : function(resp) {
      return this.unwrappedAttributes(resp);
    },

    // This is called just before a model is persisted to a remote server.
    // Wraps the model's attributes into a Rails-friendly format.
    toJSON : function() {
      // hack in rails auth token
      var object = this.wrappedAttributes();
      var csrfName = $("meta[name='csrf-param']").attr('content');
      var csrfValue = $("meta[name='csrf-token']").attr('content');
      object[csrfName] = csrfValue;
      return object;
    },

    // A new default initializer which handles data directly from Rails as
    // well as unnested data.
    initialize : function(args) {
      this.maybeUnwrap(args);
    }
  }); 

  // Mix Backbone.Events, modules, and layout management into the app object.
  return _.extend(app, {
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function(name) {
      // If already using this Layout, then don't re-inject into the DOM.
      if (this.layout && this.layout.options.template === name) {
        return this.layout;
      }

      // If a layout already exists, remove it from the DOM.
      if (this.layout) {
        this.layout.remove();
      }

      // Create a new Layout.
      var layout = new Backbone.Layout({
        template: name,
        className: "layout " + name,
        id: "layout"
      });

      // Insert into the DOM.
      $("#main").empty().append(layout.el);

      // Render the layout.
      layout.render();

      // Cache the refererence.
      this.layout = layout;

      // Return the reference, for chainability.
      return layout;
    }
  }, Backbone.Events);

});
