define([
  // Application.
  "app",
  "modules/user",
  "modules/business",
  "modules/answer",
  "modules/navigation",
  "modules/fees/parking",
  "modules/fees/parking_non_downtown",
  "modules/location"
],

function(app, User, Business, Answer, Navigation, Parking, ParkingNonDowntown, Location) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "clear":"clear",
      "requirements/city/parking":"parking",
      "requirements/city/parking_non_downtown":"parkingNonDowntown",
      "info/business": "businessInfo",
      "location/check":"locationCheck",
      "requirements/city/business_license":"businessLicense",
      "info/applicant": "userInfo",
      "*path":"panel"
    },
    index: function(e){
//      console.log("index");
    },
    clear: function(){
      this.answers.each(function(m){
        if(m)
          m.destroy();
      });
      window.alert("cleared!");
    },
    parking:function(){

      var panel = new (Answer.Views.Panel.extend(Parking.Views.Calculator.prototype))({
        collection:  this.answers,
        //useTemplate: "panels/requirements/city/parking"
      });
      console.log('parking panel', panel);

      app.layout.setView("div#content", panel);
      app.layout.render();
      console.log('rendered parking panel');
    },

    parkingNonDowntown:function() {
        var panel = new (Answer.Views.Panel.extend(ParkingNonDowntown.Views.Calculator.prototype))({
            collection: this.answers
        });
        app.layout.setView("div#content", panel);
        app.layout.render();
    },

    userInfo: function(){
      var panel = new (Answer.Views.Panel.extend(User.Views.Info.prototype))({
        collection:this.answers,
        user:this.user
      });

      app.layout.setView("div#content", panel);
      app.layout.render();
    },
    businessInfo: function(){
      var panel = new (Answer.Views.Panel.extend(Business.Views.Info.prototype))({
        collection:this.answers,
      });

      app.layout.setView("div#content", panel);
      app.layout.render();
    },
    businessLicense: function(){
      var panel = new (Answer.Views.Panel.extend(Business.Views.License.prototype))({
        collection:this.answers
      });
      app.layout.setView("div#content", panel);
      app.layout.render();
    },
    locationCheck: function(){
      var panel = new (Answer.Views.Panel.extend(Location.Views.Check.prototype))({
        collection:this.answers
      });
      app.layout.setView("div#content", panel);
      app.layout.render();
    },
    panel: function(path){
      if (path == "") {
        path="welcome";
      }
      if (path == "intro") {
        path="intro/big_picture";
      }
      app.layout.setView("div#content", new Answer.Views.Panel({
          collection:this.answers,
          useTemplate:"panels/"+path
      }));
      app.layout.render();
    },
    initialize: function(){
      this.user = new User.Model();
      this.business = new Business.Model();
      this.answers = new Answer.Collection();
      this.answers.fetch();
      app.useLayout("main");

      app.on("lookuppermit", Answer.lookupPermit, this);



      var nav =  new Navigation.Views.Main({
        business: this.business,
        answers: this.answers
      });

      var subnav =  new Navigation.Views.Sub({
        business: this.business,
        answers: this.answers
      });

      app.layout.setViews({
        "div#profile": new Answer.Views.Profile({
          collection:this.answers
        }),
        "div#nav-main": nav,
        "div#nav-sub": subnav
      });

    }});
  return Router;

});
