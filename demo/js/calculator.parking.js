OC.calculator.parking = {};

OC.calculator.parking.downtown = {

  factor: 4,
  // hasCalculated: false, // Don't think this is used --MH
  
  setUnits: function(proptype){
  	var unit;
  	if(proptype == "DOCTOR"){
  		$("#docq").show();
  	}
  	else{
  		$("#docq").hide();
  	}
  	switch( proptype ){
  		case "APARTMENT":
  			unit = "units";
  			this.factor = 4;
  			break;
  		case "DOCTOR":
  			unit = "square feet";
  			this.factor = 200;
  			break;
  		case "MERCANTILE":
  			unit = "square feet";
  			this.factor = 400;
  			break;
  		case "FURNITURE":
  			unit = "square feet";
  			this.factor = 800;
  			break;
  		case "SERVICE":
  			unit = "square feet";
  			this.factor = 1000;
  			break;
  	}
  	$("#units").html(unit);
  },
  
  calculate: function(){
    console.log("Calculating parking");
    
    // Save the data for later.
    // OC.forms.sumbit($('#parking-deficiency-form'));
    
  	var max = -1;
  	if( $("#proptype_existing").val() == "DOCTOR" ){
  		if(( $("#doctorcount").val() * 1 == 1 ) && ( $("#size_existing").val() * 1 < 1200 )){
  			this.factor = 400;
  		}
  		else{
  			max = 5 * $("#doctorcount").val();
  			this.factor = 200;
  		}
  	}
  	var spaces_needed = $("#size_existing").val() / this.factor;
  	spaces_needed = Math.ceil( spaces_needed );
  	if(max != -1){
  		spaces_needed = Math.min( max, spaces_needed );
  	}
  	$("#calculated").html( $("#spaces_existing").val() + " out of " + spaces_needed );
  	var fee = spaces_needed - $("#spaces_existing").val() * 1;
  	fee *= 106.25;
  	fee = Math.max( 0, fee );
  	$("#fee").html( "$" + this.dollarFormat(fee, 2, ".", ",") );
  },
  
  dollarFormat: function(n, c, d, t){
     var c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  },
  
  checkForEnter: function(e){
  	if(e.keyCode == 13){
  		getZoneFromAddress();
  	}
  }
};

OC.calculator.parking.general = {  
  
  init: function() {
    // Add class="business-type-rule" to every large category
    $('.tool > div').addClass('business-type-rule');

    // When the applicant selects an option,
    $('#business_type').change(function() {
      
      // Get the selection
      selected_option = '#business_type_' + $(this).val() || '';
      
      // Hide all <div class="business-type-rules">'s
      $('.business-type-rule')
      .hide()
      .slideUp('slow');
      
      // Hide the parking spot counter
      $('#parking_spaces').hide();
      
      // Show the selected <div class="business-type-rules">
      $(selected_option)
      .show()
      .slideDown('slow');
    });

    // When the applicant submits a form,
    $('.parking-calculator').submit(function(e){
          
      // Prevent default behavior of firing the action URL.
      e.preventDefault();      
      
      // Grab form data
      var form    = $(this),                 // the submitted form
      form_id = form.attr('id'),         // the form's ID
      inputs = $(this).serializeArray(); // the form data
      
      // Save the data for later.
      OC.forms.sumbit(form);
      
      // Calculate number of required car parking spaces
      var spaces = OC.calculator.parking.general.calculateSpaces(form_id, inputs);
      
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
    });

  },
 
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
   }
};