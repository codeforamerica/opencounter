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
          // console.log("Successfully logged in")
          window.location.pathname = "/info/applicant"
        }

      });
    },
  });

  return new Session();
});
