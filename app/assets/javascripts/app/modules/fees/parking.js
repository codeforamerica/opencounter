define([
  // Application.
  "app",
  "modules/answer",
],

// Map dependencies from above array.
function(app, answer) {
  
  // Create a new module.
  var Parking = app.module();
  Parking.Views.Downtown = Backbone.View.extend({

    tagName:    "section",
    className:  "content",

    events: {
      "change select,input":"saveInput"
    },

    units: {
      "apartment":  { unit: "in units",    factor: 4    },
      "doctor":     { unit: "square feet", factor: 200  },
      "mercantile": { unit: "square feet", factor: 400  },
      "furniture":  { unit: "square feet", factor: 800  },
      "service":    { unit: "square feet", factor: 1000 }
    },

    saveInput:function(ev){
      var $elem = $(ev.target);
      this.collection.addAnswer($elem.attr("name"), $elem.val());
      this.calculate();
    },

    calculate: function(){
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


    dollarFormat: function (n, c, d, t) {
        var c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "," : d,
            t = t == undefined ? "." : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
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
      
      // var result = answer.Views.Panel.prototype.serialize.call(this);
      var jurisdiction = window.location.pathname.toLowerCase().split("/").slice(2)[0];
      var panel = window.location.pathname.toLowerCase().split("/").slice(2)[1];
      var requirementIndex = this.requirements.matchingIndex(jurisdiction, panel);
      if ((requirementIndex + 1) < this.requirements.length) {
        var nextRequirement = this.requirements.at(requirementIndex + 1);
        answers.nextRequirementHref = "/requirements/" + nextRequirement.get('jurisdiction').toLowerCase() + "/" + nextRequirement.get('short_name');
        answers.nextRequirementName = nextRequirement.get('name');
      } else {
        answers.nextRequirementHref = "/summary";
        answers.nextRequirementName = "Summary";
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

  Parking.Views.NonDowntown = Backbone.View.extend({

    tagName:    "section",
    className:  "content",

    events: {
      "change select,input":"calculate"
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

    // Calculates the number of spaces a business must provide.
    // Requires the business sub-type and other fields specific to that business.
    calculateSpaces: function (business_subtype) {
      var spaces;
      switch (business_subtype) {
        case 'parking_auto':
          var square_feet = this.collection.getAnswer("square_feet"),
            spaces = Math.round(square_feet / 400);
          return spaces;
          break;

        case 'parking_service_stations':
          var service_bays = this.collection.getAnswer("service_bays"),
            employees = this.collection.getAnswer("employees"),
            spaces = Math.round(service_bays * 3) + employees;
          return spaces;
          break;

        case 'parking_banks_with_atms':
          var square_feet = this.collection.getAnswer("square_feet"),
            atms = this.collection.getAnswer("ATMs"),
            spaces = Math.round((square_feet / 400) + (atms * 1.5));
          return spaces;
          break;

        case 'parking_banks_no_atms':
          var square_feet = this.collection.getAnswer("square_feet"),
            spaces = Math.round(square_feet / 400);
          return spaces;
          break;

        case 'parking_billiard':
          var tables = this.collection.getAnswer("tables"),
            spaces = Math.round(tables * 1.5);
          return spaces;
          break;

        case 'parking_child_homes':
          var beds = this.collection.getAnswer("beds"),
            employees = this.collection.getAnswer("employees"),
            spaces = Math.round(beds / 5) + employees;
          return spaces;
          break;

        case 'parking_daycare_foster':
          var guests = this.collection.getAnswer("guests"),
            spaces = Math.round(guests / 5) + 1;
          return spaces;
          break;

        case 'parking_communication':
          var square_feet = this.collection.getAnswer("square_feet"),
            // the following line contained a reference to field_1, swapped out for square_feet
            spaces = Math.round(square_feet / 1000);
          return spaces;
          break;

        case 'parking_lower_schools':
          var employees = this.collection.getAnswer("employees"),
            spaces = employees;
          return spaces;
          break;

        case 'parking_high_schools':
          var students = this.collection.getAnswer("students"),
            employees = this.collection.getAnswer("employees"),
            spaces = Math.round(students / 10) + employees;
          return spaces;
          break;

        case 'parking_colleges':
          var students = this.collection.getAnswer("students"),
            employees = this.collection.getAnswer("employees"),
            spaces = Math.round(students / 3) + employees;
          return spaces;
          break;

        case 'parking_multi_program_fitness':
          var square_feet = this.collection.getAnswer("square_feet"),
            spaces = (square_feet / 100),
            spaces = (square_feet > 15000) ? Math.round(spaces * 1.1) : Math.round(spaces);
          return spaces;
          break;

        case 'parking_single_program_fitness':
          var aerobics_area = this.collection.getAnswer("aerobics_area"),
            basketball_volleyball_occupancy = this.collection.getAnswer("basketball_volleyball_occupancy"),
            pool_lanes = this.collection.getAnswer("pool_lanes"),
            pool_non_water_area = this.collection.getAnswer("pool_non_water_area"),
            weights_area = this.collection.getAnswer("weights_area"),
            square_feet = this.collection.getAnswer("square_feet"),
            spaces = (aerobics_area / 50) + (basketball_volleyball_occupancy / 3) + (pool_lanes * 2) + (pool_non_water_area / 300) + (weights_area / 250),
            spaces = (square_feet > 15000) ? Math.round(spaces * 1.1) : Math.round(spaces);
          return spaces;
          break;

        case 'parking_food':
          var square_feet = this.collection.getAnswer("square_feet"),
            spaces = Math.round(square_feet / 120);
          return spaces;
          break;

        case 'parking_take_out':
          var square_feet = this.collection.getAnswer("square_feet"),
            take_out_area = this.collection.getAnswer("take_out_area"),
            spaces = Math.round((square_feet / 120) + (take_out_area / 50));
          return spaces;
          break;

        case 'parking_funeral':
          var seats = this.collection.getAnswer("seats"),
            spaces = Math.round(seats / 5);
          return spaces;
          break;

        case 'parking_furn_repair':
          var square_feet = this.collection.getAnswer("square_feet"),
            spaces = Math.round(square_feet / 500);
          return spaces;
          break;

        case 'parking_halls_with_seats':
          var seats = this.collection.getAnswer("seats"),
            spaces = Math.round(seats / 3.5);
          return spaces;
          break;

        case 'parking_halls_no_seats':
          var max_occupancy_load = this.collection.getAnswer("max_occupancy_load"),
            spaces = Math.round(max_occupancy_load / 3);
          return spaces;
          break;

        case 'parking_household':
          var sales_area = this.collection.getAnswer("sales_area"),
            spaces = Math.round(sales_area / 800);
          return spaces;
          break;

        case 'parking_laundry':
          var square_feet = this.collection.getAnswer("square_feet"),
            spaces = Math.round(square_feet / 200);
          return spaces;
          break;

        case 'parking_community_care':
          var guests = this.collection.getAnswer("guests"),
            employees = this.collection.getAnswer("employees"),
            spaces = Math.round((guests / 5) + 1 + employees);
          return spaces;
          break;

        case 'parking_hotels':
          var hotel_units = this.collection.getAnswer("hotel_units"),
            spaces = hotel_units + 1;
          return spaces;
          break;

        case 'parking_convalescent':
          var beds = this.collection.getAnswer("beds"),
            employees = this.collection.getAnswer("employees"),
            spaces = Math.round((beds / 5) + employees);
          return spaces;
          break;

        case 'parking_hospitals':
          var beds = this.collection.getAnswer("beds"),
            employees = this.collection.getAnswer("employees"),
            spaces = Math.round((beds / 5) + employees);
          return spaces;
          break;

        case 'parking_medical_offices':
          var square_feet = this.collection.getAnswer("square_feet"),
            spaces = Math.round(square_feet / 200);
          return spaces;
          break;

        case 'parking_physical_therapy':
          var square_feet = this.collection.getAnswer("square_feet"),
            pool_water_area = this.collection.getAnswer("pool_water_area"),
            spaces = Math.round((square_feet / 200) + (pool_water_area / 50));
          return spaces;
          break;

        case 'parking_office':
          var square_feet = this.collection.getAnswer("square_feet"),
            spaces = Math.round(square_feet / 300);
          return spaces;
          break;

        case 'parking_plants':
          var square_feet = this.collection.getAnswer("square_feet"),
            spaces = Math.round(square_feet / 500);
          return spaces;
          break;

        case 'parking_research':
          var square_feet = this.collection.getAnswer("square_feet"),
            employees = this.collection.getAnswer("employees"),
            spaces_by_square_footage = Math.round(square_feet / 325),
            spaces_by_employees = Math.round(employees / 2);
          return (spaces_by_square_footage >= spaces_by_employees) ? spaces_by_square_footage : spaces_by_employees;
          break;

        case 'parking_retail':
          var square_feet = this.collection.getAnswer("square_feet"),
            spaces = Math.round(square_feet / 250);
          return spaces;
          break;

        case 'parking_boarding':
          var beds = this.collection.getAnswer("beds"),
            employees = this.collection.getAnswer("employees"),
            spaces = Math.round((beds / 5) + employees);
          return spaces;
          break;

        case 'parking_institutions':
          var guests = this.collection.getAnswer("guests"),
            employees = this.collection.getAnswer("employees"),
            spaces = Math.round((guests / 5) + employees);
          return spaces;
          break;

        case 'parking_nursing':
          var guests = this.collection.getAnswer("guests"),
            employees = this.collection.getAnswer("employees"),
            spaces = Math.round((guests / 5) + employees + 1);
          return spaces;
          break;

        case 'parking_theaters':
          var seats = this.collection.getAnswer("seats");
          if ((seats - 350) > 0) {
            // if 351+ seats
            spaces = Math.round(350 / 3.5) + Math.round((seats - 350) / 5);
          } else {
            // if 0-350 seats
            spaces = Math.round(seats / 3.5);
          }
          return spaces;
          break;

        case 'parking_warehouses':
          var square_feet = this.collection.getAnswer("square_feet"),
            spaces = Math.round(square_feet / 1000);
          return spaces;
          break;

        case 'parking_worship':
          var seats = this.collection.getAnswer("seats"),
            spaces = Math.round(seats / 3.5);
          return spaces;
          break;

        default:
          return "Unable to calculate.";
          break;
      }
    },

    initialize: function(options) {
      this.collection.on("reset", this.render, this);

      _.bindAll(this, 'beforeRender', 'render', 'afterRender');
      var _this = this;
      this.render = _.wrap(this.render, function(render) {
        _this.beforeRender();
        render();
        _this.afterRender();
        return _this;
      });
    },

    beforeRender: function() {
    },

    render: function() {
      return this;
    },

    clearAnswer: function(field_name) {
      this.collection.addAnswer(field_name, null);
    },

    afterRender: function(o) {
      // hide all the forms by default
      $('.business-type-rule').hide();
      $('.business-sub-type-rule').hide();

      var self = this;

      // When the applicant selects a business category
      $('#business_type').change(function() {
        self.clearAnswer('business_type');
        self.clearAnswer('required_parking_spaces');
        $('.business-type-rule').hide();
        selected_option = '#business_type_' + $(this).val() || '';
        $(selected_option).show();
      });

      // When the applicant selects a business sub-category
      $('.business_subtype').change(function() {
        $('.business-sub-type-rule').hide();
        selected_option = "#subtype_" + $(this).val() || '';
        $(selected_option).show();
      });

    },

    calculate:function() {
      var type = 'parking_' + this.collection.getAnswer('business_type');
      var subtype = this.collection.getAnswer('business_subtype');
      var business_subtype = subtype || type;
      var spaces = this.calculateSpaces(business_subtype);
    
      if ( !(isNaN(spaces) || spaces == null) ) {
        this.collection.addAnswer('required_parking_spaces', spaces);

        var display_text = "<p>You must provide "
        + spaces
        + " car parking space"
        + ((spaces !== 1) ? "s" : "")
        + ".</p>";

        $("#parking_spaces")
        .html(display_text)
        .show();
      } else {
        $("#parking_spaces")
        .html("Please fill out all the fields.")
        .show();
      }
    }

  });

  // Return the module for AMD compliance.
  return Parking;
});
