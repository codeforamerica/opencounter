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
      "click a#begin" : "begin",
    },

    begin: function() {
      session = new Session();
      currentUser = session.currentUser();
      this.user.set("account_type", "temp")
      this.saveUser();
    },



    signUp: function() {
      this.user.set("account_type", "perm")
      this.saveUser();
    },

    logIn: function() {
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
        errors = $.parseJSON(xhr.responseText)
        console.log("Error signing up: ", errors)
        $("div#errors > h4").html("We couldn't sign you up")
        $("div#errors > span").html(JSON.stringify(errors))
        $("div#errors").removeClass("hidden")

    }});
    },

    // TODO: logic out of the dom / html out of the js.
    personalise: function() {
      session = new Session();
      currentUser = session.currentUser();

      if ( currentUser && (currentUser.account_type == "perm") ) {
        $("#login-form").hide();
        $("#sign-up-form").hide();

        $("#begin-form > p.next").not(".lead").html("Saves the progress of your current application on our servers and starts a new one.")

        $("h1").html("Welcome back!")
        $("p#intro-text").html("Welcome back to OpenCounter.  Continue with your application or click below to create a new one.")
      } 
      else if ( currentUser && (currentUser.account_type == "temp") ) {
        $("#begin-form > p.next").not(".lead").html("We will delete your current progress and start afresh with a new application. Your information will not be saved until you submit your application.")

        $("h1").html("Save your progress")
        $("p#intro-text").html("You are currently using a temporary account.  Log in or sign up below to retain your progress, or click 'Begin' to start a new application.")

      } else {
        // do nothing when there is no currentUser, or if for some reason curentUser has a dfferent account_type
      }
    },

    subviews:function(){
      var self = this;
      return {
        afterRender: function(){
          self.personalise();
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
