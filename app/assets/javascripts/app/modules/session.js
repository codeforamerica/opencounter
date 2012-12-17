define([
  // Application.
  "app"
  ],

// Map dependencies from above array.
function(app) {

  Session = Backbone.View.extend( {
    currentUser: function() {
      var user
      $.ajax({
        url: "/session/current_user.json",
        dataType: "json",
        // TODO: make asychronous
        async: false,
        success: function(data) {
          user = data
        }
      });
      console.log("currentUser returning: ", user)
      return user;
    },
    // TODO: return the current business from Rails over AJAX 
    currentBusiness: function() {
      return window.currentBusiness;
      // return "SAMPLE BUSINESS"
    }

  });

  // Return the module for AMD compliance
  return new Session();
});
