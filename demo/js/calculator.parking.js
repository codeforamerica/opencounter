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
