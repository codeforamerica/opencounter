define([
  // Application.
  "app",
  "modules/user",
  "modules/business",
  "modules/answers"
],

function(app, User, Business, Answers) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "":"index",
      "*path":"panel"
    },
    index: function(e){
      console.log("index");
    },
    panel: function(path){
      console.log("panel: ", path);
      app.layout.setViews({
        "#cpan": new Answers.Views.Panel({
          collection:this.answers,
          // this input needs to be scrubbed if bb doesnt already - Mick
          useTemplate:"panels/"+path
        })
      });

      this.answers.reset();
    },
    initialize: function(){
      this.user = new User.Model();
      this.business = new Business.Model();
      this.answers = new Answers.Collection();

      app.useLayout("main").render();

      //these should be a collection
    }});
  return Router;

});
