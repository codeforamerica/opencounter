define([
  // Application.
  "app",
  "modules/fees/parking"
],

// Map dependencies from above array.
function(app, Parking) {

  // Create a new module.
  var Answer = app.module();

  // Default model.
  Answer.Model = Backbone.Model.extend({
  
  });

  // Default collection.
  Answer.Collection = Backbone.Collection.extend({
    model: Answer.Model,
    addAnswer: function(key, val, opts){
      if(!opts) opts = {};
      var m = this.where({"name": key});
      if(m.length > 0){
        m[0].set("value", val, opts);
      }else{
        this.add({name:key, value:val}, opts);
      }
    },
    getAnswer: function(key, val){
      var m = this.where({"name": key});
      if(m.length > 0){
        return m[0].get("value");
      }else{
        return val;
      }
    }
    // add sync function to talk with Rails

  });

  Answer.Views.Panel = Backbone.View.extend({

    tagName: "section",
    className: "content",

    events: {
      "change input,select": "updatedInput",
      "click a": "checkForAnswer"
    },
    updatedInput:function(ev){
      var name = $(ev.target).attr("name");
      var value = $(ev.target).val();
      this.addAnswer({name:name, value:value});
    },
    checkForAnswer:function(ev){
      if($(ev.target).is("[data-answer]")){
        var name = $(ev.target).attr("name");
        var value = $(ev.target).attr("data-answer");
        this.addAnswer({name:name, value:value});
      }
    },
    subviews: function() {
      return {beforeRender:function(){},
              afterRender:function(){}};
    },
    addAnswer:function(answer){
      var models = this.collection.where({name:answer.name})
      if(models.length > 0){
        models[0].set("value",answer.value);
      }else{
        this.collection.add({name:answer.name, value:answer.value});
      }
    },
    beforeRender: function(){
      this.subviews().beforeRender.call(this);
    },
    afterRender: function(){
      var self = this;
      this.$el.find("input").each(function(i, el){
        el = $(el);
        var models = self.collection.where({name:el.attr("name")});
        if(models.length > 0){
          el.val(models[0].get("value"));
        }
      });

      $('.drawer').hide();
      $('.toggle').click(function(e){
        $(e.target).next('.drawer').toggle();
      })

      this.subviews().afterRender.call(this);
    },
    serialize: function() {
      var model, answers={};
      for(m in this.collection.models){
        model = this.collection.models[m];
        answers[model.get("name")] = model.get("value");
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
    var sic = this.answers.getAnswer("SIC_code");
    if(zoning && sic){
      //we know what we need at this point.
      var self = this;
      var url = "/api/lookup/permit/"+zoning[0]+"/"+sic

      $.ajax(url, {success:function(data){
        self.answers.addAnswer("required_permit", data.permit);
      },dataType:"json"});

    }

  };
  

  // Return the module for AMD compliance.
  return Answer;

});
