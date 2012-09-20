define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var User = app.module();

  // Default model.
  User.Model = Backbone.Model.extend({
    name: 'user'
  });

  // Default collection.
  User.Collection = Backbone.Collection.extend({
    model: User.Model
  });

  // Return the module for AMD compliance.
  return User;

});
