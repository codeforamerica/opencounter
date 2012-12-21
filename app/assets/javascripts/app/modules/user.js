define([
  // Application.
  "app"
  ],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  User = app.module();

  // Default model.
  User.Model = Backbone.Model.extend({
    name: 'user',
    urlRoot: '/users',
    initialize: function() {
      this.on("all", function(model) {
        // personalise logic in here?
      })
    },
  });


  User.Views.LoginSignup = Backbone.View.extend({
    template: "panels/intro/sign_in",
    events: {
      "click a#applicant_sign_up" : "signUp",
      "click a#applicant_log_in" : "logIn",
      "click a#begin" : "anonSignUp",
    },

    anonSignUp: function() {
        this.user.set("account_type", "temp")
        this.saveUser();
      },

      signUp: function() {
        this.user.set("account_type", "perm")
        this.saveUser();
      },

      logIn: function() {
        $("div#errors").addClass("hidden")
        email = $("input[name=login_email]").val();
        password = $("input[name=login_password]").val();
        if (email != "" && password != "") {
          session = new Session();
          session.login(email, password);
          if (session.currentUser() == email) {
            window.location.pathname = "/info/applicant"
          } else {
          console.log("Error logging in.")
          $("div#errors > h4").html("We couldn't log you in")
          $("div#errors > span").html("Please check you have the right email address and password.")
          $("div#errors").removeClass("hidden")
          }
        };
      },

      saveUser: function(){
        var self = this;
        email = $("input[name=applicant_email]").val()
        pass = $("input[name=applicant_password]").val()
        pass_conf = $("input[name=applicant_password_confirmation]").val()
        this.user.set({
          email: email,
          password: pass,
          password_confirmation: pass_conf
        });

        // need to save an answers we had from before the user was created.
        this.user.save({}, {success:function(){
          console.log("New user: ", self.user)
          self.collection.each(function(answer){
            answer.save();
          });
          window.location.pathname = "/info/applicant"
        },error:function(model, xhr, options){
          // console.log("model: ", model)
          // console.log("xhr: ", xhr)
          // console.log("options: ", options)
          errors = $.parseJSON(xhr.responseText)
          console.log("Error signing up: ", errors)
          $("div#errors > h4").html("We couldn't sign you up")
          $("div#errors > span").html(JSON.stringify(errors))
          $("div#errors").removeClass("hidden")

      }});
      },
      subviews:function(){
        return {
          afterRender: function(){
            // var self = this;
            // // save the user if any of these change
            // this.$el.find("input[name=applicant_first_name]").change(function(){self.saveUser.call(self)});
            // this.$el.find("input[name=applicant_last_name]").change(function(){self.saveUser.call(self)});
            // this.$el.find("input[name=applicant_phone]").change(function(){self.saveUser.call(self)});

            // this.$el.find("input[name=applicant_email]").change(function(){self.saveUser.call(self)});
            // this.$el.find("p.next a").click(function(){self.saveUser.call(self)});
            // this.$el.find("").click(function(){self.saveUser.call(self)});
          },
          beforeRender: function(){}
        }
      },
      initialize: function(o) {
        this.collection.on("reset", this.render, this); 
        
        this.user = o.user;
      }


    });

  User.Views.Info = Backbone.View.extend({
    template: "panels/info/applicant",
    events: {
      "change input" : "saveUser"
    },

    saveUser:function(ev) {
      var self = this;

      key = ev.target.name.replace("applicant_", "")
      value = ev.target.value
      this.user.set(key, value)
      this.user.save();
    },

    initialize: function(o) {
      this.collection.on("reset", this.render, this); 

      this.user = o.user;
    }

  });


    // Return the module for AMD compliance.
    return User;

  });
