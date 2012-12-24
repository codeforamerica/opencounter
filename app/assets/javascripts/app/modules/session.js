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
        url: "/sessions/show.json",
        dataType: "json",
        // TODO: make asychronous
        async: false,
        success: function(data) {
          user = data
        }
      });
      // console.log("currentUser returning: ", user)
      return user;
    },

    logout: function() {
      var self = this;
      $.ajax({
        url: "/sessions/destroy.json",
        dataType: "json",
        async: false,
        success: function(data) {
          console.log("Successfully logged out")
          window.location.pathname = "/"
        }
      });
    },

    login: function(email, password) {
      var self = this;
      $.ajax({
        url: "/sessions/create.json",
        dataType: "json",
        async: false,
        type: "POST",
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        data: {
          "email": email,
          "password": password
        },
        success: function(data) {
          console.log("Successfully logged in", data)
          window.location.pathname = "/info/applicant"
        },
        error: function(data) {
          console.log("Error logging in.")
          $("div#errors > h4").html("We couldn't log you in")
          $("div#errors > span").html("Please check you have the right email address and password.")
          $("div#errors").removeClass("hidden")
        }

      });
    },
  });

  return new Session();
});
