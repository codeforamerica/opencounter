define([
  // Application.
  "app",
  "modules/user",
  "modules/business",
  "modules/answer",
  "modules/requirement",
  "modules/navigation",
  "modules/fees/traffic_impact_fee",
  "modules/location",
  "modules/session",
  "modules/fees/parking"
],

function(app, User, Business, Answer, Requirement, Navigation, TrafficImpactFee, Location, Session, Parking) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "clear":"clear",
      "info/business": "businessInfo",
      "location/check":"locationCheck",
      "intro/sign_in" : "loginSignup",
      "requirements": "requirements",
      "requirements/city/parking": "parking",
      "requirements/*path": "requirements",
      "*path":"panel"
    },
    index: function(e){
    },
    clear: function(){
      this.answers.each(function(m){
        if(m)
          m.destroy();
      });
      window.alert("cleared!");
    },

    trafficImpactFee:function() {
      var panel = new (Answer.Views.Panel.extend(TrafficImpactFee.Views.Calculator.prototype)) ({
        collection: this.answers,
        useTemplate: "panels/requirements/city/trafic_impact_fee"
      });
      app.layout.setView("div#content", panel);
      app.layout.render();
    },

    parking: function(){
      var panel;
      if (this.answers.getAnswer('zoning') == 'CBD') {
        panel = new (Answer.Views.Panel.extend(Parking.Views.Downtown.prototype)) ({
          collection: this.answers,
          template: "panels/requirements/city/parking"
        });
        panel.requirements = this.requirements;
      } else { 
        panel = new (Answer.Views.Panel.extend(Parking.Views.NonDowntown.prototype)) ({
          collection: this.answers,
          template: "panels/requirements/city/parking_non_downtown"
        });
        panel.requirements = this.requirements;
      }
      app.layout.setView("div#content", panel);
      app.layout.render();
    },

    userInfo: function() {
      var panel = new (Answer.Views.Panel.extend(User.Views.Info.prototype))({
        collection:this.answers,
        user:this.user,
        useTemplate:"info/applicant"
      });

      app.layout.setView("div#content", panel);
      app.layout.render();
    },

    loginSignup: function(){
      var panel = new (Answer.Views.Panel.extend(User.Views.LoginSignup.prototype))({
        collection:this.answers,
        user:this.user,
        useTemplate:"intro/sign_in"
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
    requirements: function(path) {
      var view = new Requirement.Views.Panel({
          collection:this.answers,
          useTemplate: "panels/requirements" + (path ? "/"+path : "")
      });
      // Add requirements info to panel
      // Requirements should probably be more available in some way, but this works for now
      view.requirements = this.requirements;
      
      app.layout.setView("div#content", view);
      app.layout.render();
    },
    panel: function(path){
      if (path == "") {
        path="welcome";
      }
      if (path == "intro") {
        path="intro/big_picture";
      }
      
      var view = new Answer.Views.Panel({
          collection:this.answers,
          useTemplate:"panels/"+path
      });
      // Add requirements info to panel
      // Requirements should probably be more available in some way, but this works for now
      view.requirements = this.requirements;
      
      app.layout.setView("div#content", view);
      app.layout.render();
    },
    initialize: function(onReady){
      var self = this;
      this.ready = false;
      if (onReady) {
        this.onReady = onReady;
      }
      this.user = new User.Model();
      this.business = new Business.Model();
      this.answers = new Answer.Collection();
      this.requirements = new Requirement.Collection();

      
      app.useLayout("main");



      var nav =  new Navigation.Views.Main({
        business: this.business,
        answers: this.answers
      });

      var subnav = new Navigation.Views.Sub({
        business: this.business,
        answers: this.answers,
        requirements: this.requirements
      });

      app.layout.setViews({
        "div#profile": new Answer.Views.Profile({
          collection:this.answers,
          user: this.user
        }),
        "div#nav-main": nav,
        "div#nav-sub": subnav
      });
      
      this.answers.fetch({
        success: function() {
          Requirement.lookupRequirements.call(self);
          // this should really be some proper subscription/event mechanism
          // HACK: this only works because lookupRequirements() is synchronous
          self.ready = true;
          if (self.onReady) {
            self.onReady();
          }
        },
        error: function() {
        }
      });

      app.on("lookuppermit", Answer.lookupPermit, this);
      app.on("lookup_requirements", Requirement.lookupRequirements, this);

    }});
  return Router;

});
