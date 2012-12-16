define([
  // Application.
  "app",
  "modules/fees/parking"
  // TODO: put here any path which extends this panel, I think this will allow access to .`answers` in the templates
],

// Map dependencies from above array.
function(app, Parking) {

  // Create a new module.
  var Answer = app.module();

  // Default model.
  Answer.Model = Backbone.Model.extend({
    name: 'answer',
    url: function(){
      return this.id? '/answers/' + this.id : '/answers';
    },

    // allow getting/setting of objects (stored as JSON strings)
    get: function(attr) {
      var result = this.constructor.__super__.get.call(this, attr);
      if (result) {
        try {
          result = JSON.parse(result);
        }
        catch(ex) {}
      }
      return result;
    },

    set: function(key, value, options) {
      if (typeof key === "object") {
        for (var keyName in key) {
          var val = key[keyName];
          key[keyName] = (val && typeof val === "object") ? JSON.stringify(val) : val;
        }
      }
      else if (value && typeof value === "object") {
        value = JSON.stringify(value);
      }

      return this.constructor.__super__.set.call(this, key, value, options);
    }
  });

  // Default collection.
  Answer.Collection = Backbone.Collection.extend({
    model: Answer.Model,
    url: '/answers',
    addAnswer: function(key, val, opts){
      if(!opts) opts = {};
      var m = this.where({"field_name": key});
      if(m.length > 0){
        m[0].set("value", val, opts).save();
      }else{
        this.create({field_name:key, value:val}, opts);
      }
    console.log("adding answer: " + key, val);
    },
    getAnswer: function(key, val){
      var m = this.where({"field_name": key});
      if(m.length > 0){
        return m[0].get("value");
      }else{
        return val;
      }
    }
  });

  Answer.Views.Panel = Backbone.View.extend({

    tagName: "section",
    className: "content",

    events: {
      "change input,select": "updatedInput",
      "click a": "checkForAnswer",
      "click #sendHelpEmail": "sendHelpEmail",
      "click #sendApplicationEmail": "sendApplicationEmail",
    },
    updatedInput:function(ev){
      var name = $(ev.target).attr("name");
      var value = $(ev.target).val();
      this.collection.addAnswer(name, value);
    },
    checkForAnswer:function(ev){
      if($(ev.target).is("[data-answer]")){
        var name = $(ev.target).attr("name");
        var value = $(ev.target).attr("data-answer");
        this.collection.addAnswer(name, value);
      }
    },
    sendApplicationEmail:function(ev){
        //do things here
        ev.preventDefault();
        var help_data = {query:$("textarea[name=help_query]").val(),
                         phone:$("input[name=applicant_phone]").val(),
                         email:$("input[name=applicant_email]").val()};

        $.ajax("/api/email/application", {data:help_data, method:"POST", success:function(data){

          if(data && (data.status == "sent")){
              $("div.user_message").html("Your application has been submitted. Someone will get back to you soon.");
          }

        }});
      },
    sendHelpEmail:function(ev){
      //do things here
      ev.preventDefault();
      var help_data = {query:$("textarea[name=help_query]").val(),
                       phone:$("input[name=applicant_phone]").val(),
                       email:$("input[name=applicant_email]").val()};

      $.ajax("/api/email/help", {data:help_data, method:"POST", success:function(data){

        if(data && (data.status == "sent")){
            $("div.user_message").html("Your email has been sent. Someone will get back to you soon.");
        }

      }});
    },

    subviews: function() {
      return {beforeRender:function(){},
              afterRender:function(){}};
    },
    beforeRender: function(){
      this.subviews().beforeRender.call(this);
    },
    afterRender: function(){
      var self = this;
      this.$el.find("input").each(function(i, el){
        el = $(el);
        var models = self.collection.where({field_name:el.attr("name")});
        if(models.length > 0){
          el.val(models[0].get("value"));
        }
      });

      $('.drawer').hide();
      $('.toggle').click(function(e){
        $(e.target).next('.drawer').toggle();
      });

      this.subviews().afterRender.call(this);
      
    },



    serialize: function() {
      var model, answers={};
      for(m in this.collection.models){
        model = this.collection.models[m];
        answers[model.get("field_name")] = model.get("value");
      }
      return {answers:answers};
    },
    cleanup: function() {
      this.collection.off(null, null, this);
    },
    initialize: function(o) {
      if(o.useTemplate)
        this.template = o.useTemplate;
      this.collection.on("reset", this.render, this);

    }
  });

  Answer.Views.Profile = Backbone.View.extend({

    tagName: "section",
    className: "profile",
    template:"profile",
    events: {
      // "change input[name='business_name']" : "personalise",
      // "change input[name='applicant_first_name']" : "personalise",
      // "change input[name='applicant_last_name']" : "personalise",
      // "click a#personalise" : "personalise"
    },


    personalise:function() {
      console.log("function: personalise");
      
      session = new Session();
      currentUser = session.currentUser()

      // hide the sign up form if the user is logged in
      if ( currentUser ) {
        $(".well#sign-up").hide();
      } else {
        $(".well#sign-up").show();
      }

      // TODO: would be nice to have a funtion to DRY these two up.

      // user pill
      if ( currentUser ) {
        var text = currentUser;
        var link = "#";
        var link_text = "Log out";
      } else {
        var text = "Returning?";
        var link = "#"
        var link_text = "Jump back in &rarr;"
      }
      $("#user_pill > p > span").html(text);
      $("#user_pill > p > a").attr("href", link);
      $("#user_pill > p > a").html(link_text);

      // business pill
      currentBusiness = session.currentBusiness();
      if ( currentBusiness ) {
        var text = currentBusiness;
        var link = "#";
        var link_text = "View Business &rarr;";
      } else {
        var text = "New here?";
        var link = "/intro"
        var link_text = "Get started &rarr;"
      }
      $("#business_pill > p > span").html(text);
      $("#business_pill > p > a").attr("href", link);
      $("#business_pill > p > a").html(link_text);


    },

    beforeRender: function(){

    },

    afterRender: function(){
      this.personalise();
      // $('.profile-contents').hide();  // maybe do this in css -Mick
     },



    cleanup: function() {
      this.collection.off(null, null, this);
    },
    initialize: function(o) {
      this.collection.on("reset", this.render, this);
      this.collection.on("change", this.render, this);
    }
  });

  //this isnt this function final resting place, need to be more thought out.
  Answer.lookupPermit = function(){
    var zoning = this.answers.getAnswer("zoning");
    var cic = this.answers.getAnswer("CIC_code");
    if(zoning && cic){
      //we know what we need at this point.
      var self = this;
      var url = "/api/lookup/permit/"+zoning[0]+"/"+cic

      $.ajax({
        url:url,
        dataType:"json",
        async:false,
        success:function(data){
          self.answers.addAnswer("required_permit", data);
        }
      });

    }

  };


  // Return the module for AMD compliance.
  return Answer;

});
