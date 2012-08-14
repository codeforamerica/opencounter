define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Fieldanswers = app.module();

  // Default model.
  Fieldanswers.Model = Backbone.Model.extend({
  
  });

  // Default collection.
  Fieldanswers.Collection = Backbone.Collection.extend({
    model: Fieldanswers.Model
  });

  // Return the module for AMD compliance.
  return Fieldanswers;

});
