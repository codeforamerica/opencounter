define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Location = app.module();

  Location.Views.Check = Backbone.View.extend({
    template: "panels/location/check",
    checkLocation:function(ev){
      ev.preventDefault();
      var address = this.$el.find("input[name=business_physical_address_street]").val()
      this.getZoneFromAddress(address);
    },
    subviews:function(){
      //This looks for a typeahead connect with api for results
      return {
        afterRender: function(){
          // Set up the map

          var myOptions = {
            center: new google.maps.LatLng(36.9741171, -122.0307963),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          this.map = new google.maps.Map(this.$el.find("#map")[0], myOptions);
          var self = this;
          // TODO, we should extent inherited events.
          this.$el.find("form").submit(function(ev){self.checkLocation.call(self, ev)});

        },
        beforeRender: function(){}
      }
    },
    getZoneFromAddress: function(address){
	    while(address.indexOf("  ") > -1){
		    address = address.replace("  "," ");
	    }
	    var lcadd = address.toLowerCase();
	    // filter addresses which end with ", Santa Cruz, CA" but not "Santa Cruz St"
	    if(lcadd.indexOf("santa cruz") != -1){
		    if(lcadd.lastIndexOf("santa cruz") > lcadd.lastIndexOf("st")){
			    address = address.substring(0, lcadd.lastIndexOf("santa cruz"));
		    }
	    }
	    while(address.indexOf(",") > -1){
		    address = address.replace(",","");
	    }
	    lcadd = address.toLowerCase();

	    // abbreviate addresses to match GIS data
	    if(lcadd.indexOf(" street") > -1){
		    address = address.substring(0, lcadd.indexOf(" street") + 3);
	    }
	    if(lcadd.indexOf(" avenue") > -1){
		    address = address.substring(0, lcadd.indexOf(" avenue") + 4);
	    }
	    if(lcadd.indexOf(" drive") > -1){
		    address = address.substring(0, lcadd.indexOf(" drive") + 3);
	    }
	    if(lcadd.indexOf(" circle") > -1){
		    address = address.substring(0, lcadd.indexOf(" circle") + 4);
	    }
	    if(lcadd.indexOf(" lane") > -1){
		    address = address.substring(0, lcadd.indexOf(" lane")) + " Ln";
	    }
	    if(lcadd.indexOf(" boulevard") > -1){
		    address = address.substring(0, lcadd.indexOf(" boulevard")) + " Blvd";
	    }
	    if(lcadd.indexOf(" court") > -1){
		    address = address.substring(0, lcadd.indexOf(" court")) + " Ct";
	    }
	    if(lcadd.indexOf(" place") > -1){
		    address = address.substring(0, lcadd.indexOf(" place")) + " Pl";
	    }
 	    address = address.replace(/^\s+|\s+$/g,"");
      var self =this;
      var url  = "http://gis.cityofsantacruz.com/ArcGIS/rest/services/AddressSeach/MapServer/0/query?f=json&spatialRel=esriSpatialRelIntersects&outSR=4326&returnGeometry=true&where=ADD_%20LIKE%20upper%20%28%27%25" + address + "%25%27%29&outFields=*&";
      $.ajax(url, {jsonp:"callback", dataType:"jsonp", success:function(data){self.setZoning.call(self,data)}}, "jsonp");
    },
    setZoning:function(data){
      var zoning = [];
      if(data.features.length > 0){
        for(var i =1; i<7; i++){
          if(data.features[0].attributes['Zoning'+i] != " "){
            zoning.push(Location.convertGisToCityZoning(data.features[0].attributes['Zoning'+i].split(" - ")[0]));
          }
        }

        // Get prior use
        this.collection.addAnswer("prioruse", data.features[0].attributes["USECDDESC"])

        // Get Business Improvement District
        this.collection.addAnswer("bid", data.features[0].attributes["BIA"].replace(" ", ""))

        // Get APN
        this.collection.addAnswer("apn", data.features[0].attributes["APN"])

        // Get zoning
        this.collection.addAnswer("zoning", zoning);

        app.trigger("lookuppermit");
        this.$el.find("#flash-notice").show();
        this.$el.find("#flash-notice").html("That location is zoned for: "+zoning.join(","));

        var latlng = new google.maps.LatLng(data.features[0].geometry.y,
                                            data.features[0].geometry.x);

        this.collection.addAnswer("latlng", [latlng.lat(), latlng.lng()]);

        var marker = new google.maps.Marker({
          position: latlng,
          map: this.map
          //title:address
        });
        this.map.setCenter(latlng);
        this.map.setZoom(16);


      }

    }

  });

  // FIXME: this should really be in the database, rather than manually mapped in the code here
  Location.convertGisToCityZoning = function(gisZoning) {
    return {
       "CB": "C-B",
       "CBD": "CBD",
       "CBD-E": "CBD(E)"
       "CC": "C-C",
       "CD/R": "C-D/R",
       "CN": "C-N",
       "R-L/ CON": "CON",
       "R-M/MU/ CON": "CON",
       "R-M/COM": "CON",
       "CT": "C-T",
       // "GIS_return": "CZ-O", suggest deleting  as it maps to OF-R
       "EA-20": "E-A",
       "FP": "F-P",
       "F-P": "FP-O",
       // "GIS_return": "GB-O",
       // "GIS_return": "HD-O",
       "IG": "I-G",
       "IG/PER": "I-G PER",
       "IG/ PER": "I-G PER",
       "IG/PER2": "I-G PER-2",
       "IGP2": "I-G PER-2",
       // "GIS_return": "MS-O", likely to conflict with primary CC or PA zoning 
       "R-M/ MU": "MU-O",
       "OFR": "OF-R",
       "PA": "P-A",
       "PF": "P-F",
       "PS": "PK",
       "PK/PF": "PK",
       "R15": "R-1",
       "R17": "R-1",
       "R110": "R-1",
       "R-1-5": "R-1",
       "R-1-7": "R-1",
       "R-1-10": "R-1",
       "RH": "R-H",
       "RL": "R-L",
       "RM": "R-M",
       "RS-1A": "R-S",
       "RS-2A": "R-S",
       "RS-5A": "R-S",
       "RS-10A": "R-S",
       "RT": "R-T",
       "RTA": "R-T(A)",
       "RTB": "R-T(B)",
       "R-T(B)/ PER": "R-T(B)/PER",
       "RTC": "R-T(C)",
       "R-T(C)/PER": "R-T(C)/PER",
       "RTD": "R-T(D)",
       "RTE": "R-T(E)",
       "SCH": "SC-H", /need to ask rich on this one, returning as CZ-O
       // "GIS_return": "SOL",
       // "GIS_return": "SP-O", also will ask rich on this one it maps to both WCD and CZ-O
       // "GIS_return": "WCD"
   
    }[gisZoning] || gisZoning;
  };

  // Return the module for AMD compliance.
  return Location;

});
