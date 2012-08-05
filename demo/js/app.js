var OC = { 
  
  prefix: 'OC-',
  
  forms: {},
  util: {},
  
  init: function() {
    console.log("Initializing");
      
    $('.submit').bind({
      click: OC.forms.sumbit
    });
        
    this.recall();
  },
  
  recall: function() {
    // Remember who the user is and what they've done. 
    // We'll do this with cookies for the time being.
    
    $('form').each(function(index){
      OC.forms.recall(this);
    });
    
    // If we do, update the form
  }
  
};

OC.forms.recall = function(form) {
  // Get form ID
  var id = $(form).attr('id');
  
  // See if we have something stored for this form.
  
};

OC.forms.sumbit = function(event) {
  event.preventDefault();
  var form = $(this).closest('form');
  
  // Save the data from the form as a cookie
  var cookieName = OC.prefix + $(form).attr('id');
  var data = $(form).serializeObject();
  OC.util.setJSONCookie(cookieName, data);
};

/*
 * 
 */
OC.util.getJSONFromCookie = function(name) {
  return JSON.parse($.cookie(name));
};

OC.util.setJSONCookie = function(name, data) {
  $.cookie(name, JSON.stringify(data));  
};

// Utility to serialize complex things. Like forms.
// http://stackoverflow.com/a/1186309/117014  
// usage: $('form').serializeObject();
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

