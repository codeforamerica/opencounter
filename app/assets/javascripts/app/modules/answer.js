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

    // FIXME: currently does not behave as expected.  Reveluate purpose and find another solution.
    personaliseNav:function() {
      console.log("will now personalise nav");

      // show the user info pill if you are logged in
      $(document).ready(function() {
        if ( window.currentUser.name ) {
          $("#login_pill").hide();
          $("#current_user_pill>p").prepend(window.currentUser.name);
          $("#current_user_pill").show();
        } else {
          $("#current_user_pill").hide();
          $("#login_pill").show();
        }

        // show the business info pill if you've told us the business' name
        if ( window.currentBusiness.name ) {
          $("#newbie_pill").hide();
          $("#current_business_pill>p").prepend(window.currentBusiness.name);
          $("#current_business_pill").show();
        } else {
          $("#current_business_pill").hide();
          $("#newbie_pill").show();
        }
      });
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
      "click .profile-toggle": "toggleProfile"
    },
    beforeRender: function(){

    },
    afterRender: function(){

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
