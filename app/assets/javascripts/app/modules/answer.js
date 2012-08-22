define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Answer = app.module();

  // Default model.
  Answer.Model = Backbone.Model.extend({
  
  });

  // Default collection.
  Answer.Collection = Backbone.Collection.extend({
    model: Answer.Model
  });

  Answer.Views.Panel = Backbone.View.extend({

    tagName: "section",
    className: "content",

    events: {
        "keypress #search": "enterSearch"
    },
    enterSearch: function(ev){
      
    },
    findLocation: function(ev) {
      var model = this.model;

      //do search, and trigger add location event
      //app.router.go("org", org, "user", name);
    },
    beforeRender: function(){
      console.log("template:",this.template);
    },
    afterRender: function(){
      console.log("template:",this.el);
      $("div#content").html(this.el);
    },
    cleanup: function() {
      this.collection.off(null, null, this);
    },
    initialize: function(o) {
      this.template = o.useTemplate;
      this.collection.on("reset", this.render, this); 
      this.collection.on("change", this.render, this); 
    }
  });

  Answer.Views.Profile = Backbone.View.extend({

    tagName: "section",
    className: "profile",
    template:"profile",
    events: {
      "click .profile-toggle": "toggleProfile"
    },
    beforeRender: function(){
      console.log("template:",this.template);
    },
    afterRender: function(){
      console.log("template:",this.el);
      $("div#profile").html(this.el);
      $('.profile-contents').hide();  // maybe do this in css -Mick
    },
    toggleProfile:function(e){
        $('.profile-contents').slideToggle();
    },
    cleanup: function() {
      this.collection.off(null, null, this);
    },
    initialize: function(o) {
      this.collection.on("reset", this.render, this); 
      this.collection.on("change", this.render, this); 
    }
  });


  // Return the module for AMD compliance.
  return Answer;

});
