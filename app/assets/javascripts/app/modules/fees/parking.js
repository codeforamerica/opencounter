define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Parking = app.module();
  // Create a new module.
  Parking.Model = Backbone.Model.extend({
  
  });

  Parking.Views.Calculator = Backbone.View.extend({

    tagName: "section",
    className: "content",
    template: "panels/requirement/city/parking-downtown",

    events: {
      "change select,input":"saveInput"
    },
    units:{"apartment":{unit:"units", factor:4},
           "doctor":{unit:"square feet", factor:200},
           "mercantile":{unit:"square feet", factor:400},
           "furniture":{unit:"square feet", factor:800},
           "service":{unit:"square feet", factor:1000}},

    saveInput:function(ev){
      var $elem = $(ev.target);
      this.collection.addAnswer($elem.attr("name"), $elem.val());      
      this.calculate();
    },
    calculate: function(){
      var max = -1;
      var factor = this.units[this.collection.getAnswer("parking_proptype").toLowerCase()].factor;
      var unit = this.units[this.collection.getAnswer("parking_proptype").toLowerCase()].unit;
      this.collection.addAnswer("parking_units", unit);
      console.log("unit:", unit);
  	  if(this.collection.getAnswer("parking_proptype") == "DOCTOR" ){
  		if(( this.collection.getAnswer("parking_doctor_count") * 1 == 1 ) && 
           ( this.collection.getAnswer("parking_size_existing") * 1 < 1200 )){
  		  factor = 400;
  		}else{
  		  max = 5 * this.collection.getAnswer("parking_doctor_count");
  		  factor = 200;
  		}
  	  }
  	  var spaces_needed = this.collection.getAnswer("parking_size_existing") / factor;
  	  spaces_needed = Math.ceil( spaces_needed );
  	  if(max != -1){
  		spaces_needed = Math.min( max, spaces_needed );
  	  }
      this.collection.addAnswer("calculated", spaces_needed);
  	  //$("#calculated").html( $("#spaces_existing").val() + " out of " + spaces_needed );
  	  var fee = spaces_needed - this.collection.getAnswer("parking_spaces_existing") * 1;
  	  fee *= 106.25;
  	  fee = Math.max( 0, fee );
      if(!fee){
        fee = 0.0;
      }
  	  this.collection.addAnswer("parking_fee", fee);
      console.log("fee", fee);
      //.html( "$" + this.dollarFormat(fee, 2, ".", ",") );
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
          var proptype =this.collection.getAnswer("parking_proptype", "APARTMENT");
          this.$el.find("select[name=parking_proptype]").val(proptype);
          this.$el.find("input").each(function(i,elem){
            $(elem).val(self.collection.getAnswer($(elem).attr("name"), ""));
          });
          this.calculate();
        },
        beforeRender: function(){}
      };
    },
    serialize: function() {
      var model, answers={};
      for(m in this.collection.models){
        model = this.collection.models[m];
        answers[model.get("name")] = model.get("value");
      }
      return {answers:answers, 
              //formated fee
             };
    },
    cleanup: function() {
      this.collection.off(null, null, this);
    },
    initialize: function(o) {
      //this.collection.on("reset", this.render, this); 
      //this.collection.on("change", this.render, this); 
      //this.collection.on("add", this.render, this); 
      if(this.collection.getAnswer("parking_proptype") === undefined){
        this.collection.addAnswer("parking_proptype", "APARTMENT");
      }
    }
  });

  // Return the module for AMD compliance.
  return Parking;
});
