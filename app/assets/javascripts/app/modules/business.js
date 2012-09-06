define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Business = app.module();

  // Default model.
  Business.Model = Backbone.Model.extend({
  
  });

  Business.TypeModel = Backbone.Model.extend({
  
  });

  Business.Views.Info = Backbone.View.extend({
    template: "panels/info/business",
    afterRender: function(){
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
    subviews:function(){
      //This looks for a typeahead connect with api for results
      return {
        afterRender: function(){
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
        beforeRender: function(){}
      }

    }    

  });

  // Return the module for AMD compliance.
  return Business;

});
