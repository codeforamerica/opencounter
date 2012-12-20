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
      "click button#applicant_sign_up" : "signUp",
      "click button#applicant_log_in" : "logIn",
      "click a#begin" : "anonSignUp",
    },

    anonSignUp: function() {
        // this.user.set("account_type", "temp")
        this.saveUser();
      },

      signUp: function() {
        // this.user.set("account_type", "perm")
        this.saveUser();
      },

      logIn: function() {
        email = $("input[name=login_email]").val();
        password = $("input[name=login_password]").val();
        if (email != "" && password != "") {
          session = new Session();
          session.login(email, password);
          // window.location.reload();
        };
      },

      saveUser: function(){
        var self = this;
        email = $("input[name=applicant_email]").val()
        this.user.set("email", email);
        // this.user.set("phone",this.$el.find("input[name=applicant_phone]").val());
        // this.user.set("first_name",this.$el.find("input[name=applicant_first_name]").val());
        // this.user.set("last_name",this.$el.find("input[name=applicant_last_name]").val());

        // need to save an answers we had from before the user was created.
        this.user.save({}, {success:function(){
          console.log("New user: ", self.user)
          self.collection.each(function(answer){
            answer.save();
          });
        },error:function(m, r){
        // console.log("error:", m, r);
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
