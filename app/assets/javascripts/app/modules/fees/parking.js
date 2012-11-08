define([
       // Application.
       "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Parking = app.module();

  Parking.Model = Backbone.Model.extend({

  });

  Parking.Views.Calculator = Backbone.View.extend({

    tagName:    "section",
    className:  "content",
    template:   "panels/requirements/city/parking",

    events: {
      "change select,input":"saveInput"
    },

    units: {
      "apartment":  { unit: "units",       factor: 4    },
      "doctor":     { unit: "square feet", factor: 200  },
      "mercantile": { unit: "square feet", factor: 400  },
      "furniture":  { unit: "square feet", factor: 800  },
      "service":    { unit: "square feet", factor: 1000 }
    },

    saveInput:function(ev){
      var $elem = $(ev.target);
      console.log('saving new input', $elem.attr('name'));
      this.collection.addAnswer($elem.attr("name"), $elem.val());
      this.calculate();
    },

    calculate: function(){
      console.log('beginning calculation');


      var max = -1;
      var factor = this.units[this.collection.getAnswer("parking_proptype").toLowerCase()].factor;
      var unit = this.units[this.collection.getAnswer("parking_proptype").toLowerCase()].unit;

      // Add parking units to answers and inject into template
      this.collection.addAnswer("parking_units", unit);
      this.$el.find(".units").html(unit);

      // Choose appropriate space/fee factor for the business type
      if ( this.collection.getAnswer("parking_proptype") == "DOCTOR" ) {
        this.showDoctorInputs();
        if (  ( this.collection.getAnswer("parking_doctor_count") * 1 == 1 ) &&
            ( this.collection.getAnswer("parking_size_existing") * 1 < 1200 ) ){
          factor = 400;
        } else {
          max = 5 * this.collection.getAnswer("parking_doctor_count");
          factor = 200;
        }
      } else {
        this.hideDoctorInputs();
      }

      // Calculate number of spaces needed
      var spaces_needed = this.collection.getAnswer("parking_size_existing") / factor;
      spaces_needed = Math.ceil( spaces_needed );
      if (max != -1) {
        spaces_needed = Math.min( max, spaces_needed );
      }
      this.collection.addAnswer("calculated", spaces_needed);
      // $("#calculated").html( $("#spaces_existing").val() + " out of " + spaces_needed );

      // Calculate fee
      var fee = spaces_needed - this.collection.getAnswer("parking_spaces_existing") * 1;
      fee *= 106.25;
      fee = Math.max(0, fee);
      if (!fee) {
        fee = 0.0;
      }

      console.log('ending calculation', fee);

      // Add fee to answers and inject into template
      this.collection.addAnswer("parking_fee", fee);
      this.$el.find(".fee").html("$"+this.dollarFormat(fee,2,".", ","));
    },

    showDoctorInputs: function() {
      this.$('#doctor_inputs').show();
    },

    hideDoctorInputs: function() {
      this.$('#doctor_inputs').hide();
    },


    dollarFormat: function(n, c, d, t){
      var c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    },

    subviews: function(){
      return {
        afterRender: function(){
          //$("div#content").html(this.el);
          var self = this;
          var proptype = this.collection.getAnswer("parking_proptype", "APARTMENT");
          this.$el.find("select[name=parking_proptype]").val(proptype);
          this.$el.find("input").each(function(i,elem) {
            $(elem).val(self.collection.getAnswer($(elem).attr("name"), ""));
          });
          this.calculate();
        },
        beforeRender: function(){}
      };
    },

    serialize: function() {
      var model;
      var answers = {};

      for (m in this.collection.models) {
        model = this.collection.models[m];
        answers[model.get("name")] = model.get("value");
      }
      return {
        answers: answers
        // formatted fee
      };
    },

    cleanup: function() {
      this.collection.off(null, null, this);
    },

    initialize: function(o) {
      //this.collection.on("reset", this.render, this);
      //this.collection.on("change", this.render, this);
      //this.collection.on("add", this.render, this);
      if (this.collection.getAnswer("parking_proptype") === undefined) {
        this.collection.addAnswer("parking_proptype", "APARTMENT");
      }
    }

  });

  // Return the module for AMD compliance.
  return Parking;
});
