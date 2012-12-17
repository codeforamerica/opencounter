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
  });


  User.Views.Info = Backbone.View.extend({
    template: "panels/info/applicant",
    // events: {
    //   "click button#applicant_sign_up" : "signUp",
    //   "change input,select" : "saveUser"
    // },

    signUp: function() {
      // TODO: should actually sign the user up.

    },


    saveUser: function(){
      var self = this;
      this.user.set("email",this.$el.find("input[name=applicant_email]").val());
      this.user.set("phone",this.$el.find("input[name=applicant_phone]").val());
      this.user.set("first_name",this.$el.find("input[name=applicant_first_name]").val());
      this.user.set("last_name",this.$el.find("input[name=applicant_last_name]").val());

      //need to save an answers we had from before the user was created.
      this.user.save({}, {success:function(){
        self.collection.each(function(answer){
          answer.save();
        });
      },error:function(m, r){
//        console.log("error:", m, r);
      }});
    },
    subviews:function(){
      return {
        afterRender: function(){
          var self = this;
          // save the user if any of these change
          this.$el.find("input[name=applicant_first_name]").change(function(){self.saveUser.call(self)});
          this.$el.find("input[name=applicant_last_name]").change(function(){self.saveUser.call(self)});
          this.$el.find("input[name=applicant_phone]").change(function(){self.saveUser.call(self)});

          this.$el.find("input[name=applicant_email]").change(function(){self.saveUser.call(self)});
          this.$el.find("p.next a").click(function(){self.saveUser.call(self)});
          this.$el.find("").click(function(){self.saveUser.call(self)});
        },
        beforeRender: function(){}
      }
    },
    initialize: function(o) {
      this.collection.on("reset", this.render, this); 
      
      this.user = o.user;
    }


  });


  // Return the module for AMD compliance.
  return User;

});
