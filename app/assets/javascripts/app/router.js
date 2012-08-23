define([
  // Application.
  "app",
  "modules/user",
  "modules/business",
  "modules/answer",
  "modules/navigation"
],

function(app, User, Business, Answer, Navigation) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "*path":"panel"
    },
    index: function(e){
      console.log("index");
    },
    panel: function(path){
      
      if(path == ""){path="intro";}
      var sidebar =  new Navigation.Views.Sidebar({  // this might make more sense as a view on user? - Mick
        business:this.business,
        answers:this.answers
      });
      app.layout.setViews({
        "div#panel": new Answer.Views.Panel({
          collection:this.answers,
          useTemplate:"panels/"+path
        }),
        "div#profile": new Answer.Views.Profile({
          collection:this.answers
        }),
        "div#nav-main": sidebar
      });

      app.layout.render();
    },
    initialize: function(){
      this.user = new User.Model();
      this.business = new Business.Model();
      this.answers = new Answer.Collection();
      app.useLayout("main")

    }});
  return Router;

});
