define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Business = app.module();

  // Default model.
  Business.Model = Backbone.Model.extend({
  
  });

  Business.TypeModel = Backbone.Model.extend({
  
  });

  // Return the module for AMD compliance.
  return Business;

});
