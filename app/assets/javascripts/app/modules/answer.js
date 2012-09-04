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
      //TODO redo the way fee calcs are loaded.
      
      if(this.template == "panels/requirement/city/parking"){
        this.insertView("div.fee-calc-parking", 
                        new Parking.Views.Calculator({collection:this.collection}));
      }
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


      //This looks for a typeahead connect with api for results
      var typeaheadel = this.$el.find(".typeahead");
      if(typeaheadel.length > 0){
        // TODO check for type of typeahead, for now just SIC
        $(typeaheadel).change(function(ev){
          if(self.saveSICValues($(ev.target).val(), self.sicData)){

            $(ev.target).addClass("invalid");
          }else{
            $(ev.target).removeClass("invalid");
          }
        });
        $(typeaheadel).typeahead({source:this.getSIC, matcher:function(){return true;}, self:self});
      }

    },
    getSIC:function(query, process){
      var self = this.options.self;
      $.ajax("/api/lookup/sic.json",{data:{q:query}, success:function(data){
        self.sicData = data;
        var list = [];
        for(d in data){
          list.push(data[d].sic_name ? data[d].sic_name : data[d].industry_subtype);
        }
        process(list);
      }}, "json");

    },
    saveSICValues:function(text, data){
      var found = false
      for(d in data){
        if((text == data[d].sic_name ) || (text == data[d].industry_subtype)){
          for(key in data[d]){
            this.collection.addAnswer("SIC_"+key, data[d][key], {silent:true});
          }
          found = true;
        }
      }
      return found;
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
