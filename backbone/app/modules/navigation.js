define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Navigation = app.module();

  // Default model.
  Navigation.Model = Backbone.Model.extend({
  
  });

  // Default collection.
  Navigation.Collection = Backbone.Collection.extend({
    model: Navigation.Model
  });


  Navigation.Views.Sidebar = Backbone.View.extend({

    tagName: "nav",
    className: "nav-main",
    template:"navigation",
    events: {
    },
    beforeRender: function(){
      console.log("template:",this.template);
    },
    afterRender: function(){
      console.log("template:",this.el);
      //$("nav.nav-main").html(this.el);
    },
    cleanup: function() {
      this.model.off(null, null, this);
    },
    initialize: function(o) {
      this.business = o.business;
      this.business.on("change", this.render, this);
    }
  });


  // Return the module for AMD compliance.
  return Navigation;

});
