var OC = { 
  
  prefix: 'OC-',
  
  forms: {},
  util: {},
  state: {},
  calculator: {},
  data: {},
  
  init: function() {
    console.log("Initializing");
    
    console.log("Here is everything in localStorage:");
    console.log(localStorage);
    
    OC.routing.init();
    OC.location.init();
    OC.calculator.parking.general.init();
    $('.submit').bind({
      click: OC.forms.submitLink
    });
    
    OC.util.isPlanningOpen();
    
    // Update first name when you hit business-info'. 'first-name' 
        
    // Check to see if we have stored data about any forms
    OC.forms.recallFields();

    // Autocomplete business types
    $('#business_code').autocomplete({
      source: OC.data.calgoldBusinessTypes,
      appendTo: '#business-type-container',
      select: function(event, ui) {       
        // Save the selected option (doesn't happen naturally the way we want)
        key = OC.forms.key('naics');
        OC.util.storeData(key, ui);
      }
    });
    
    // Set up we're-here-to-help toggles
    $('.drawer').hide();
    $('.toggle').click(function(e){
      e.PreventDefault;
      $(this).next('.drawer').toggle();
    });
    
    // Listen and be ready to update some panels
    $.subscribe("updatePanel-info_business", function(event){
      $('.first-name').html(OC.util.getData('OC-field-applicant_first_name'));
    });
    
    $.subscribe("updatePanel-location_non_home_occ_check_site", function(event){
      var businessCode = OC.util.getData('OC-field-naics');
      console.log(businessCode);
      
      $('.business-type').html(businessCode.item.value);
      $('.business-naics-code').html(businessCode.item.name);
    });
    
    
    
    $.subscribe("updatePanel-location_non_home_occ_choose_site", function(event){
      OC.calculator.zoning.init();
    });
    
    
    // Set up Profile pulldown
    $('.profile-contents').hide();
    $('.profile-toggle').click(function(e){
        // Draw .profile-contents
        $('.profile-contents').slideToggle();
    });
    
    // Set up conditional mailing address on Working From Home panel
    $('input[name="does_mailing_address_match_business_address"]').parent().next('.conditional').hide();
    $('input[name="does_mailing_address_match_business_address"]').live("click", function(){
        if (!($(this).is(':checked'))) {
            $(this).parent().next('.conditional').show();
        } else {
            $(this).parent().next('.conditional').hide();
        }
    });
    
    // Set up conditional fields on About Your Business panel
    $('input[name="applicant_is_sole_owner"]').parent().next('.conditional').hide();
    $('input[name="applicant_is_sole_owner"]').live("click", function(){
        if (!($(this).is(':checked'))) {
            $(this).parent().next('.conditional').show();
        } else {
            $(this).parent().next('.conditional').hide();
        }
    });
    
    // Set up conditional fields on Building Permit panel


  }
};

/** 
 * Fill in any fields with saved data
 */
OC.forms.recallFields = function() {
  $('input').each(function(index){
    var name = $(this).attr('name');

    var key = OC.forms.key(name);
    var value = OC.util.getData(key);
    var type = $(this).attr('type');
  

    //if(value) { console.log(value); }
    
    if (type === 'radio') {
      if($(this).attr('value') == value) {
        $(this).prop("checked", true);
      }
    }else if(type === 'checkbox') {
      $(this).prop("checked", true);
    }else if(type !='submit'){
      $(this).val(value);
    };
    
  });
};

OC.forms.businessTypeAutocomplete = function(event) {
  var value = $(this).attr('value');
  console.log(value);
  
  // Autocomplete stuff
  // #businessTypeInput
};

/** 
 * Generate a key for localStorage based on the name of a form field
 */ 
OC.forms.key = function(name) {
  return OC.prefix + 'field-' + name;
};

/**
 * Handle the sumbit link being clicked
 */
OC.forms.submitLink = function(event) {
  event.preventDefault();
  var form = $(this).closest('form');
  OC.forms.sumbit(form);
};

/**
 * Handle form submissions our way
 */
OC.forms.sumbit = function(form) {  
  // Save the data from the form in localStorage
  var data = $(form).serializeObject();
  console.log(form);
  
  $.each(data, function(key, value){
    var localStorageKey = OC.forms.key(key);
    console.log("Key: " + key + " value: " + value);
    OC.util.storeData(localStorageKey, value);
  });
};

/** .........................................................................
 *  Utilities
 */

OC.state.set = function(key, val){
    var data = OC.util.getData("OC-state");
    if(data === null){
        data = {};
    }
    data[key] = val;
    OC.util.storeData("OC-state", data);
};

OC.state.get = function(key){

    var data = OC.util.getData("OC-state");
    if(data === null){
        data = {};
    }
    if(key === undefined){
        return data;
    }else{
        return data[key];
    }
};
 
OC.util.getData = function(key) {
    return JSON.parse(localStorage.getItem(key));
};

OC.util.storeData = function(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
};

OC.util.isPlanningOpen = function() {
  // Todo: tell if planning is actually open.
  return "closed";
};

/** 
 * Utility to serialize complex things. Like forms.
 * http://stackoverflow.com/a/1186309/117014  
 * usage: $('form').serializeObject();
 */
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
