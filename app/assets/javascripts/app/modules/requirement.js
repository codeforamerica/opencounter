define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

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
    url: '/requirements'
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
    }
    else {
      this.requirements.reset([]);
    }
  };
  

  // Return the module for AMD compliance.
  return Requirement;

});
