define([
       // Application.
       "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var ParkingNonDowntown = app.module();

  ParkingNonDowntown.Model = Backbone.Model.extend({

  });

  ParkingNonDowntown.Views.Calculator = Backbone.View.extend({

      tagName:    "section",
      className:  "content",
      template:   "panels/requirements/city/parking_non_downtown",

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

    // this method calculates the number of spaces, given the business type
    // (currently called form_id), the size of the building (in square_feet)
    // and any other fields.
    //
    calculateSpaces: function(form_id, inputs) {

      var field_1 = (typeof inputs[0] === "undefined") ? 0 : inputs[0]['value'],
      field_2 = (typeof inputs[1] === "undefined") ? 0 : inputs[1]['value'],
      field_3 = (typeof inputs[2] === "undefined") ? 0 : inputs[2]['value'],
      field_4 = (typeof inputs[3] === "undefined") ? 0 : inputs[3]['value'],
      field_5 = (typeof inputs[4] === "undefined") ? 0 : inputs[4]['value'],
      field_6 = (typeof inputs[5] === "undefined") ? 0 : inputs[5]['value'],
      spaces;

      switch (form_id) {
        case 'parking_auto':
          var square_feet = field_1,
        spaces      = Math.round(square_feet / 400);
        return spaces;
        break;

        case 'parking_service_stations':
          var service_bays = field_1,
        employees    = field_2,
        spaces = Math.round(service_bays * 3) + employees;
        return spaces;
        break;

        case 'parking_banks_with_atms':
          var square_feet = field_1,
        atms        = field_2,
        spaces      = Math.round( (square_feet / 400) + (atms * 1.5) );
        return spaces;
        break;

        case 'parking_banks_no_atms':
          var square_feet = field_1,
        spaces      = Math.round(square_feet / 400);
        return spaces;
        break;

        case 'parking_billiard':
          var tables    = field_1,
        spaces    = Math.round(tables * 1.5);
        return spaces;
        break;

        case 'parking_child_homes':
          var beds      = field_1,
        employees = field_2,
        spaces    = Math.round(beds / 5) + employees;
        return spaces;
        break;

        case 'parking_daycare_foster':
          var guests = field_1,
        spaces = Math.round(guests / 5) + 1;
        return spaces;
        break;

        case 'parking_communications':
          var square_feet = field_1,
        spaces      = Math.round(field_1 / 1000);
        return spaces;
        break;

        case 'parking_lower_schools':
          var employees = field_1,
        spaces    = employees;
        return spaces;
        break;

        case 'parking_high_schools':
          var students  = field_1,
        employees = field_2,
        spaces    = Math.round(students / 10) + employees;
        return spaces;
        break;

        case 'parking_colleges':
          var students  = field_1,
        employees = field_2,
        spaces    = Math.round(students / 3) + employees;
        return spaces;
        break;

        case 'parking_multi_program_fitness':
          var square_feet = field_1,
        spaces      = (square_feet / 100),
        spaces      = (square_feet > 15000) ? Math.round(spaces * 1.1) : Math.round(spaces);
        return spaces;
        break;

        case 'parking_single_program_fitness':
          var aerobics_area                   = field_1,
        basketball_volleyball_occupancy = field_2,
        pool_lanes                      = field_3,
        pool_non_water_area             = field_4,
        weights_area                    = field_5,
        square_feet                     = field_6,
        spaces                          = (aerobics_area / 50) + (basketball_volleyball_occupancy / 3) + (pool_lanes * 2) + (pool_non_water_area / 300) + (weights_area / 250),
        spaces                          = (square_feet > 15000) ? Math.round(spaces * 1.1) : Math.round(spaces);
        return spaces;
        break;

        case 'parking_food':
          var square_feet = field_1,
        spaces      = Math.round( square_feet / 120 );
        return spaces;
        break;

        case 'parking_take_out':
          var square_feet   = field_1,
        take_out_area = field_2,
        spaces        = Math.round( (square_feet / 120) + (take_out_area / 50) );
        return spaces;
        break;

        case 'parking_funeral':
          var seats  = field_1,
        spaces = Math.round( seats / 5 );
        return spaces;
        break;

        case 'parking_furniture_repair':
          var square_feet = field_1,
        spaces      = Math.round( square_feet / 500 );
        return spaces;
        break;

        case 'parking_halls_with_seats':
          var seats  = field_1,
        spaces = Math.round( seats / 3.5 );
        return spaces;
        break;

        case 'parking_halls_no_seats':
          var max_occupancy_load = field_1,
        spaces             = Math.round( max_occupancy_load / 3 );
        return spaces;
        break;

        case 'parking_household':
          var sales_area = field_1,
        spaces     = Math.round( sales_area / 800 );
        return spaces;
        break;

        case 'parking_laundry':
          var square_feet = field_1,
        spaces      = Math.round( square_feet / 200 );
        return spaces;
        break;

        case 'parking_community_care':
          var guests    = field_1,
        employees = field_2,
        spaces    = Math.round( (guests / 5) + 1 + employees );
        return spaces;
        break;

        case 'parking_hotels':
          var hotel_units = field_1,
        spaces      = hotel_units + 1;
        return spaces;
        break;

        case 'parking_convalescent':
          var beds      = field_1,
        employees = field_2,
        spaces    = Math.round( (beds / 5) + employees );
        return spaces;
        break;

        case 'parking_hospitals':
          var beds      = field_1,
        employees = field_2,
        spaces    = Math.round( (beds / 5) + employees );
        return spaces;
        break;

        case 'parking_medical_offices':
          var square_feet = field_1,
        spaces      = Math.round(square_feet / 200);
        return spaces;
        break;

        case 'parking_physical_therapy':
          var square_feet     = field_1,
        pool_water_area = field_2,
        spaces          = Math.round( (square_feet / 200) + (pool_water_area / 50) );
        return spaces;
        break;

        case 'parking_business_offices':
          var square_feet = field_1,
        spaces      = Math.round(square_feet / 300);
        return spaces;
        break;

        case 'parking_plants':
          var square_feet = field_1,
        spaces      = Math.round(square_feet / 500);
        return spaces;
        break;

        case 'parking_research_development':
          var square_feet               = field_1,
        employees                 = field_2,
        spaces_by_square_footage  = Math.round(square_feet / 325),
        spaces_by_employees       = Math.round(employees / 2);
        return ( spaces_by_square_footage >= spaces_by_employees ) ? spaces_by_square_footage : spaces_by_employees;
        break;

        case 'parking_retail':
          var square_feet = field_1,
        spaces      = Math.round(square_feet / 250);
        return spaces;
        break;

        case 'parking_boarding':
          var beds      = field_1,
        employees = field_2,
        spaces    = Math.round( (beds / 5) + employees );
        return spaces;
        break;

        case 'parking_institutions':
          var guests    = field_1,
        employees = field_2,
        spaces    = Math.round( (guests / 5) + employees );
        return spaces;
        break;

        case 'parking_nursing':
          var guests    = field_1,
        employees = field_2,
        spaces    = Math.round( (guests / 5) + employees + 1 );
        return spaces;
        break;

        case 'parking_theaters':
          var seats = field_1;
        if ((seats - 350) > 0) {
          // if 351+ seats
          spaces = Math.round(350 / 3.5) + Math.round( (seats - 350) / 5 );
        } else {
          // if 0-350 seats
          spaces = Math.round(seats / 3.5);
        }
        return spaces;
        break;

        case 'parking_warehouses':
          var square_feet = field_1,
        spaces      = Math.round(square_feet / 1000);
        return spaces;
        break;

        case 'parking_worship':
          var seats   = field_1,
        spaces  = Math.round(seats / 3.5);
        return spaces;
        break;

        default:
          return "Unable to calculate.";
        break;
      }
    },

    initialize: function(options) {
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

    afterRender: function(o) {
      // hide all the forms by default
      $('.business-type-rule').hide();

      //// make each div.business-type-rules an accordion
      //$('.business-type-rule').addClass('accordion');
      /*$('.accordion').accordion();*/


      // When the applicant selects an option,
      $('#business_type').change(function() {
        // Get the selection
        selected_option = '#business_type_' + $(this).val() || '';
        // Hide the parking spot counter
        //$('#parking_spaces').hide();
        // Show only the selected <div class="business-type-rules">
        $('.business-type-rule').hide();
        $(selected_option)
        .show()
      });

    },

    events: {
      "change select,input":"saveInput",
      // "change select,input":"saveInput"
      // "click .calc_button":"calculate"
    },

    saveInput:function(ev) {
      var $elem = $(ev.target);
      console.log('adding answer: ' + $elem.attr('name'), $elem.val());
      this.collection.addAnswer($elem.attr("name"), $elem.val());
      this.calculate();
    },

    // TODO:  perform the calculation based on data from the answers collection,
    //        like in downtown parking.js, rather than reading from the form.
    calculate:function() {
      // Grab form data
      var form    = $(this),                 // the submitted form
      form_id = form.attr('id'),         // the form's ID
      inputs = $(this).serializeArray(); // the form data

      // Calculate number of required car parking spaces
      var spaces = this.calculateSpaces(form_id, inputs);

      // Build the display text
      var display_text = "<p>You must provide "
      + spaces
      + " car parking space"
      + ((spaces !== 1) ? "s" : "")
      + ".</p>";

      // Show the display text
      $("#parking_spaces")
      .html(display_text)
      .show();

    }

  });

  // Return the module for AMD compliance.
  return ParkingNonDowntown;
});
