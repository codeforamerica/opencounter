define([
  // Application.
  "app",
  "modules/answer",
],

// Map dependencies from above array.
function(app, answer) {

  // Create a new module.
  var Requirement = app.module();

  // Default model.
  Requirement.Model = Backbone.Model.extend({
    name: 'requirement',
    url: function(){
      return this.id ? ('/requirements/' + this.id) : '/requirements';
    }
  });

  // Default collection.
  Requirement.Collection = Backbone.Collection.extend({
    model: Requirement.Model,
    url: '/requirements',
    
    matchingIndex: function(jurisdiction, shortName) {
      var index = -1;
      for (var i = 0, len = this.length; i < len; i++) {
        var requirement = this.at(i);
        if (requirement.get("jurisdiction").toLowerCase() === jurisdiction && requirement.get("short_name").toLowerCase() === shortName) {
          index = i;
        }
      }
      return index;
    }
  });
  
  Requirement.lookupRequirements = function() {
    var cic = this.answers.getAnswer("CIC_code");
    if (cic) {
      // grab the requirements for this code
      var self = this;

      $.ajax({
        url: "/api/lookup/requirements",
        data: {cic: cic},
        dataType: "json",
        async: false,
        success: function (data){
          self.requirements.reset(data);
        }
      });
    } else {
      this.requirements.reset([]);
    }
  };
  
  Requirement.Views.Panel = answer.Views.Panel.extend({
    initialize: function(o) {
      this.pathInfo = window.location.pathname.toLowerCase().split("/").slice(2);
      this.pathInfo = {
        jurisdiction: this.pathInfo[0],
        shortName: this.pathInfo[1]
      };
      answer.Views.Panel.prototype.initialize.call(this, o);
    },
    
    serialize: function() {
      var result = answer.Views.Panel.prototype.serialize.call(this);
      var requirementIndex = this.requirements.matchingIndex(this.pathInfo.jurisdiction, this.pathInfo.shortName);
      result.pathInfo = this.pathInfo;
      result.firstRequirement = this.requirements.at(0);
      if ((requirementIndex + 1) < this.requirements.length) {
        var nextRequirement = this.requirements.at(requirementIndex + 1);
        result.nextRequirementHref = "/requirements/" + nextRequirement.get('jurisdiction').toLowerCase() + "/" + nextRequirement.get('short_name');
        result.nextRequirementName = nextRequirement.get('name');
      } else {
        result.nextRequirementHref = "/summary";
        result.nextRequirementName = "Summary";
      }
      return result;
    }
  });
  // Return the module for AMD compliance.
  return Requirement;

});
