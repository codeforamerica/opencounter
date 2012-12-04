define([
  //Application
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module
  var TrafficImpactFee = app.module();

  TrafficImpactFee.Views.Calculator = Backbone.View.extend({

    tagName: "section",
    className: "content",
    template: "panels/requirements/city/traffic_impact_fee",

  events: {
    "change select,input":"saveInput",
  },

  saveInput:function(ev) {
    window.answers = this.collection;
    ev.preventDefault();
    var $elem = $(ev.target);
    this.collection.addAnswer($elem.attr("name"), $elem.val());
    this.calculate();
  },

  calculate:function() {
    // TODO: use answers values to calculate the TIF
    // TODO: fill in the 'Region:' line

    // set the units
    this.setUnits();
    $("#units").html(this.collection.getAnswer("tif_units"));


    // TODO: first calculate the region
    if (!this.collection.getAnswer("tif_region")) {
      this.calculateRegion();
    }
    hasCalculated = true;
    var rate_existing = this.getRate( this.collection.getAnswer("tif_proptype_existing"), this.collection.getAnswer("tif_region") );
    var rate_proposed = this.getRate( this.collection.getAnswer("tif_proptype_proposed"), this.collection.getAnswer("tif_region") );
    var addtrips = rate_proposed * ( $("#size_existing").val() / factor ) - rate_existing * ($("#size_existing").val() / factor );
    addtrips = Math.ceil( addtrips );
    if(addtrips > 0){
      $("#calculated").html("Adding " + addtrips);
    }
    else{
      // FIXME: this doesn't make a lot of sense - explain more clearly
      $("#calculated").html("Same or fewer ");
    }
    var addfee = 405 * addtrips;
    // FIXME: fetch myRegion from DB
    if(myRegion == 2){ // BEACH / SOLA
      addfee += 94 * addtrips;
    }
    addfee = Math.max(0, addfee);
    $("#fee").html("$" + dollarFormat(addfee, 2, ".", ","));
    //TODO: add the fee to the answers

  },

  // TODO: set the region from answers rather than DOM
  // TODO: write `in_sola`, `in_downtown` functions
  calculateRegion:function() {
    if(results.features.length == 0){
      // if address lookup fails, turn text box red
      document.getElementById("address").style.backgroundColor = "#f44";
    }
    else{
      document.getElementById("address").style.backgroundColor = "#fff";
      var latlng = [results.features[0].geometry.y, results.features[0].geometry.x];
      if( in_sola(latlng) ){
        myRegion = 2;
        $("#regionOut").html("Region: Beach/SOLA");
      }
      else if( in_downtown(latlng) ){
        myRegion = 1;
        $("#regionOut").html("Region: Downtown");
      }
      else{
        myRegion = 0;
        $("#regionOut").html("Region: Citywide");
      }
      if(hasCalculated){
        calculate();
      }
    }
  },

  getRate:function(zone, region) {
    switch(zone){
      case "RESIDENTIAL":
        rate = 3.9;
      break;
      case "SINGLE":
        rate = 10;
      break;
      case "APARTMENT":
        rate = 6.5;
      break;
      case "CONDO":
        rate = 7.5;
      break;
      case "SENIOR":
        case "SRO":
        rate = 5.5;
      break;
      case "HOTEL":
        if(region == 1){
        rate = 8.5;
      }
      else{
        rate = 9.5;
      }
      break;
      case "SERVICE":
        rate = 108;
      break;
      case "OFFICE":
        if(region == 1){
        rate = 6.7;
      }
      else{
        rate = 20;
      }
      break;
      case "MEDICAL":
        if(region == 1){
        rate = 20.7;
      }
      else{
        rate = 34;
      }
      break;
      case "RESTAURANT":
        if(region == 1){
        rate = 26.2;
      }
      else{
        rate = 100;
      }
      break;
      case "SUPERMARKET":
        if(region == 1){
        rate = 26.2;
      }
      else{
        rate = 44;
      }
      break;
      case "RETAIL":
        if(region == 1){
        rate = 26.2;
      }
      else{
        rate = 40;
      }
      break;
      case "RETAIL_LARGE":
        rate = 30;
      break;
      case "CONVENIENCE":
        rate = 270;
      break;
    }
    return rate;
  },


  dollarFormat:function(n, c, d, t){
    var c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
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

  afterRender: function() {
  },

  setUnits: function () {
    var units = "";
    factor = 1;
    switch (this.collection.getAnswer("tif_proptype_existing")) {
      case "RESIDENTIAL":
      case "SINGLE":
      case "APARTMENT":
      case "CONDO":
      case "SENIOR":
      case "SRO":
        units = "Units";
        break;
      case "HOTEL":
        units = "Rooms";
        break;
      case "SERVICE":
        units = "Pump Stations";
        break;
      case "RESTAURANT":
      case "OFFICE":
      case "MEDICAL":
      case "RETAIL":
      case "SUPERMARKET":
      case "RETAIL_LARGE":
      case "CONVENIENCE":
        units = "square feet gross floor area";
        factor = 1000;
        break;
    }
    this.collection.addAnswer("tif_units", units);
  },

  //TODO: fetch address from answers rather than DOM
  getZoneFromAddress:function(){
    var address = $("#address").val();
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
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "http://gis.cityofsantacruz.com/ArcGIS/rest/services/AddressSeach/MapServer/0/query?f=json&spatialRel=esriSpatialRelIntersects&outSR=4326&returnGeometry=true&where=ADD_%20LIKE%20upper%20%28%27%25" + address + "%25%27%29&outFields=*&callback=setRegion";
    document.body.appendChild(s);
  },

  clearAnswer: function(field_name) {
    this.collection.addAnswer(field_name, null);
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
  }

  });

  // Return module for AMD compliance
  return TrafficImpactFee;
});
