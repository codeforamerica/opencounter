var OC = { 
  
  prefix: 'OC-',
  
  forms: {},
  util: {},
  
  init: function() {
    console.log("Initializing");
    console.log(localStorage);
      
    $('.submit').bind({
      click: OC.forms.sumbit
    });
        
    // Check to see if we have stored data about any forms
    OC.forms.recallFields();
  }
};

/** 
 * Fill in any fields with saved data
 */
OC.forms.recallFields = function() {
 $('input').each(function(index){
   console.log("Checking if we have data for " + $(this).attr('name'));
   var key = OC.forms.key($(this).attr('name'));
   var value = OC.util.getData(key);
   $(this).val(value);
 });
};
 
OC.forms.key = function(name) {
  return OC.prefix + 'field-' + name;
};

OC.forms.sumbit = function(event) {
  event.preventDefault();
  var form = $(this).closest('form');
  
  // Save the data from the form in localStorage
  var data = $(form).serializeObject();
  $.each(data, function(key, value){
    var key = OC.forms.key(key);
    OC.util.storeData(key, value);
  });
};

/** .........................................................................
 *  Utilities
 */
 
OC.util.getData = function(key) {
  return JSON.parse(localStorage.getItem(key));
};

OC.util.storeData = function(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  console.log("Stored:");
  console.log(localStorage.getItem(key));
};


/** 
 * Utility to serialize complex things. Like forms.
 * http://stackoverflow.com/a/1186309/117014  
 * usage: $('form').serializeObject();
 */
$.fn.serializeObject = function()
{
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


/// OLD =======
/**
 * Fill in any form fields with saved data 
 */
OC.forms.recall = function() {
  $('form').each(function(index){
    console.log($(this).attr('id'));
    
    // Retrieve the data
    var key = OC.util.key($(this).attr('id'));
    var data = OC.util.getData(key);
    
    // Fill in the form
    console.log(data);
  });
};

