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
    name: 'user',
    urlRoot: '/users'
  });


  User.Views.Info = Backbone.View.extend({
    template: "panels/info/applicant",
    saveUser: function(){
      this.user.set("email",this.$el.find("input[name=applicant_email]").val());
      this.user.set("phone",this.$el.find("input[name=applicant_phone]").val());
      this.user.set("first_name",this.$el.find("input[name=applicant_first_name]").val());
      this.user.set("last_name",this.$el.find("input[name=applicant_last_name]").val());
      this.user.save();
    },
    subviews:function(){
      return {
        afterRender: function(){
          var self = this;
          this.$el.find("input[name=applicant_email]").change(function(){self.saveUser.call(self)});
          this.$el.find("p.next a").click(function(){self.saveUser.call(self)});
        },
        beforeRender: function(){}
      }
    },
    initialize: function(o) {
      this.collection.on("reset", this.render, this); 
      this.collection.on("change", this.render, this); 
      this.user = o.user;
    }


  });


  // Return the module for AMD compliance.
  return User;

});
