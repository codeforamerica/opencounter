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

  // Default collection.
  Business.Collection = Backbone.Collection.extend({
    model: Business.Model
  });

  // Return the module for AMD compliance.
  return Business;

});
