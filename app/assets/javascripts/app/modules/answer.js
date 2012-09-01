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
    addAnswer: function(key, val){
      var m = this.where({"name": key});
      if(m.length > 0){
        m[0].set("value", val);
      }else{
        this.add({name:key, value:val});
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
      "change input": "updatedInput",
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
    addAnswer:function(answer){
      var models = this.collection.where({name:answer.name})
      if(models.length > 0){
        models[0].set("value",answer.value);
      }else{
        this.collection.add({name:answer.name, value:answer.value});
      }
    },
    beforeRender: function(){
      this.insertView("div.fee-calc-parking", 
                     new Parking.Views.Calculator({collection:this.collection}));
    },
    afterRender: function(){
      $("div#content").html(this.el);
      var self = this;
      this.$el.find("input").each(function(i, el){
        el = $(el);
        var models = self.collection.where({name:el.attr("name")});
        if(models.length > 0){
          el.val(models[0].get("value"));
        }
      });
      var typeaheadel = this.$el.find(".typeahead");
      if(typeaheadel.length > 0){
        //check for type of typeahead
        $(typeaheadel).typeahead({source:this.getSIC, matcher:function(){return true;}});
      }

    },
    getSIC:function(query, process){
      
      $.ajax("/api/lookup/sic.json",{data:{q:query}, success:function(data){
        var list = [];
        for(d in data){
          list.push(data[d].sic_name ? data[d].sic_name : data[d].industry_subtype);
        }
        process(list);
      }}, "json");

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
