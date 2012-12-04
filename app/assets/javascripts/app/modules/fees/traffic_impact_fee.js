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
    ev.preventDefault();
    var $elem = $(ev.target);
    this.collection.addAnswer($elem.attr("name"), $elem.val());
    this.calculate();
  },

  calculate:function() {
    // set the units
    this.setUnits();
    $("#units").html(this.collection.getAnswer("tif_units"));

    // set the region
    this.calculateRegion();
    $("#regionOut").html("The region for this address is: ").append(this.collection.getAnswer("tif_region"));

    // set the business address
    $("#businessAddress").html("You have told us your business is located in: ").append(this.collection.getAnswer("business_physical_address_street"))

    // set the number of trips more / less
    this.calculateTrips();
    var trips = this.collection.getAnswer("tif_trips");
    if (trips > 0) {
      $("#calculated").html("Adding " + trips);
    } else {
      // FIXME: this text doesn't make a lot of sense - explain more clearly
      $("#calculated").html("Same or fewer ");
    }

    // set the fee
    this.calculateFee();
    var fee = this.dollarFormat(this.collection.getAnswer("tif_fee"), 2, ".", ",");
    $("#fee").html(fee);
  },

  calculateTrips:function() {
    var rate_existing = this.getRate( this.collection.getAnswer("tif_proptype_existing"), this.collection.getAnswer("tif_region") );
    var rate_proposed = this.getRate( this.collection.getAnswer("tif_proptype_proposed"), this.collection.getAnswer("tif_region") );
    var size_existing = this.collection.getAnswer("tif_size_existing");
    var factor = this.collection.getAnswer("tif_factor");

    var trips = rate_proposed * ( size_existing / factor ) - rate_existing * (size_existing / factor );
    trips = Math.ceil( trips );
    this.collection.addAnswer("tif_trips", trips);
  },

  calculateFee:function() {
    var trips = this.collection.getAnswer("tif_trips");
    var fee = 405 * trips;
    if(this.collection.getAnswer("tif_region") === "Beach/SOLA"){
      fee += 94 * trips;
    }
    fee = Math.max(0, fee);
    this.collection.addAnswer("tif_fee", fee)
  },

  calculateRegion:function() {
    var latlng = this.collection.getAnswer("latlng");
    var region = "Citywide";

    if( this.inSola(latlng) ){
      region = "Beach/SOLA";
    }
    else if( this.inDowntown(latlng) ){
      region = "Downtown";
    }
    this.collection.addAnswer("tif_region", region);
  },

  inSola:function(latlng) {
    var sola = [
      [36.963033,-122.027588],
      [36.963011,-122.028650],
      [36.964373,-122.031100],
      [36.965123,-122.030851],
      [36.965501,-122.030727],
      [36.965572,-122.030453],
      [36.965590,-122.030387],
      [36.965789,-122.030443],
      [36.966121,-122.030564],
      [36.966188,-122.030588],
      [36.966211,-122.030508],
      [36.966333,-122.030124],
      [36.966343,-122.030092],
      [36.966483,-122.030143],
      [36.966599,-122.030185],
      [36.966704,-122.030224],
      [36.966835,-122.030272],
      [36.966967,-122.030320],
      [36.967099,-122.030368],
      [36.967231,-122.030416],
      [36.967363,-122.030464],
      [36.967494,-122.030512],
      [36.967626,-122.030560],
      [36.967758,-122.030608],
      [36.967890,-122.030656],
      [36.968021,-122.030704],
      [36.968153,-122.030752],
      [36.968466,-122.030866],
      [36.968488,-122.030660],
      [36.968509,-122.030454],
      [36.968533,-122.030249],
      [36.968545,-122.029897],
      [36.968547,-122.029862],
      [36.968584,-122.029519],
      [36.968587,-122.029486],
      [36.968628,-122.029102],
      [36.968644,-122.028957],
      [36.968681,-122.028600],
      [36.968703,-122.028604],
      [36.968731,-122.028350],
      [36.968753,-122.028146],
      [36.968768,-122.028002],
      [36.968796,-122.027747],
      [36.968818,-122.027547],
      [36.968839,-122.027347],
      [36.968862,-122.027144],
      [36.968883,-122.026944],
      [36.968896,-122.026821],
      [36.968901,-122.026777],
      [36.968919,-122.026611],
      [36.968934,-122.026475],
      [36.968948,-122.026350],
      [36.968970,-122.026146],
      [36.969006,-122.025807],
      [36.969029,-122.025597],
      [36.969048,-122.025427],
      [36.969066,-122.025258],
      [36.969102,-122.024922],
      [36.969094,-122.024652],
      [36.969128,-122.024348],
      [36.969182,-122.023872],
      [36.969219,-122.023629],
      [36.969277,-122.023412],
      [36.969318,-122.023284],
      [36.969283,-122.023257],
      [36.969087,-122.023207],
      [36.968550,-122.022605],
      [36.968063,-122.021973],
      [36.968067,-122.021905],
      [36.968095,-122.021440],
      [36.968068,-122.021174],
      [36.967990,-122.020926],
      [36.967851,-122.020567],
      [36.967817,-122.020503],
      [36.967782,-122.020095],
      [36.967792,-122.019871],
      [36.967823,-122.019603],
      [36.967859,-122.019290],
      [36.967837,-122.018924],
      [36.967774,-122.018710],
      [36.967749,-122.018545],
      [36.967713,-122.018254],
      [36.967704,-122.018168],
      [36.967652,-122.017837],
      [36.967609,-122.017503],
      [36.967605,-122.017470],
      [36.967591,-122.017416],
      [36.967537,-122.016393],
      [36.967529,-122.016247],
      [36.967489,-122.015492],
      [36.967470,-122.015229],
      [36.967469,-122.015214],
      [36.967458,-122.015109],
      [36.967450,-122.014983],
      [36.967425,-122.014860],
      [36.967383,-122.014744],
      [36.967378,-122.014734],
      [36.967272,-122.014534],
      [36.967107,-122.014318],
      [36.965908,-122.013572],
      [36.965782,-122.013472],
      [36.965647,-122.013363],
      [36.965596,-122.013350],
      [36.965225,-122.013492],
      [36.964212,-122.013507],
      [36.963811,-122.017909],
      [36.963223,-122.020559],
      [36.963186,-122.020724],
      [36.963159,-122.020849],
      [36.963115,-122.021048],
      [36.962886,-122.021836],
      [36.963096,-122.021944],
      [36.963049,-122.022068],
      [36.963238,-122.022163],
      [36.963065,-122.022585],
      [36.963076,-122.022593],
      [36.962896,-122.023023],
      [36.962725,-122.022894],
      [36.962561,-122.023311],
      [36.962537,-122.023286],
      [36.962405,-122.023095],
      [36.962453,-122.023047],
      [36.962399,-122.022963],
      [36.962361,-122.023003],
      [36.962308,-122.022925],
      [36.962292,-122.022945],
      [36.962057,-122.022604],
      [36.961681,-122.022045],
      [36.961641,-122.021819],
      [36.959671,-122.018910],
      [36.959807,-122.018761],
      [36.958892,-122.017413],
      [36.958733,-122.017581],
      [36.958561,-122.017516],
      [36.958565,-122.017494],
      [36.958387,-122.017424],
      [36.958388,-122.017415],
      [36.958346,-122.017399],
      [36.958338,-122.017432],
      [36.958259,-122.017404],
      [36.957878,-122.017262],
      [36.957872,-122.017286],
      [36.957850,-122.017318],
      [36.957253,-122.017090],
      [36.957192,-122.017340],
      [36.957799,-122.017571],
      [36.957781,-122.017657],
      [36.957979,-122.017734],
      [36.958006,-122.017790],
      [36.958187,-122.017857],
      [36.958187,-122.017872],
      [36.958253,-122.017897],
      [36.958347,-122.017933],
      [36.958569,-122.018262],
      [36.958703,-122.018306],
      [36.958748,-122.018266],
      [36.958978,-122.018606],
      [36.959061,-122.018729],
      [36.959330,-122.019126],
      [36.959434,-122.019279],
      [36.959576,-122.019489],
      [36.959622,-122.019557],
      [36.959726,-122.019711],
      [36.960026,-122.020153],
      [36.960260,-122.020498],
      [36.960262,-122.020575],
      [36.960505,-122.020932],
      [36.960645,-122.020787],
      [36.961028,-122.021353],
      [36.961063,-122.021405],
      [36.961093,-122.021448],
      [36.961085,-122.021456],
      [36.961004,-122.021542],
      [36.961120,-122.021712],
      [36.961201,-122.021625],
      [36.961315,-122.021785],
      [36.961303,-122.021795],
      [36.961453,-122.022021],
      [36.961471,-122.022002],
      [36.961548,-122.022121],
      [36.962424,-122.023408],
      [36.962486,-122.023455],
      [36.962345,-122.023999],
      [36.962320,-122.024008],
      [36.961943,-122.024157],
      [36.961273,-122.025101],
      [36.961009,-122.024791],
      [36.959923,-122.025368],
      [36.959990,-122.025455],
      [36.960083,-122.025577],
      [36.960174,-122.025688],
      [36.960328,-122.025651],
      [36.961180,-122.025446],
      [36.961298,-122.025351],
      [36.961308,-122.025387],
      [36.961356,-122.025648],
      [36.961504,-122.026694],
      [36.961488,-122.026697],
      [36.961494,-122.026767],
      [36.961490,-122.026878],
      [36.961471,-122.026985],
      [36.961438,-122.027087],
      [36.961435,-122.027093],
      [36.961735,-122.027303],
      [36.961654,-122.027481],
      [36.961580,-122.027646],
      [36.961513,-122.027795],
      [36.961438,-122.027963],
      [36.962057,-122.027651],
      [36.962091,-122.027634],
      [36.962260,-122.027538],
      [36.962344,-122.027487],
      [36.962909,-122.027197],
      [36.963038,-122.027152],
      [36.963033,-122.027588]
    ];
    return this.ptInPoly(latlng, sola)
  },

  inDowntown:function(latlng) {
    var downtown = [
      [36.977916,-122.025894],
      [36.977861,-122.025905],
      [36.977781,-122.025921],
      [36.977717,-122.025934],
      [36.977765,-122.026228],
      [36.977846,-122.026719],
      [36.977894,-122.027017],
      [36.977894,-122.027099],
      [36.977704,-122.027124],
      [36.977364,-122.027151],
      [36.977210,-122.026297],
      [36.977653,-122.025585],
      [36.977853,-122.025264],
      [36.977330,-122.024770],
      [36.977020,-122.024530],
      [36.975361,-122.023790],
      [36.975266,-122.023759],
      [36.975172,-122.023725],
      [36.975116,-122.023706],
      [36.975059,-122.023689],
      [36.975002,-122.023674],
      [36.974945,-122.023661],
      [36.974887,-122.023651],
      [36.974829,-122.023643],
      [36.974771,-122.023637],
      [36.974713,-122.023634],
      [36.974552,-122.023631],
      [36.974390,-122.023634],
      [36.973435,-122.023668],
      [36.973066,-122.023807],
      [36.972916,-122.023802],
      [36.972735,-122.023808],
      [36.972361,-122.023819],
      [36.972279,-122.023815],
      [36.972182,-122.023811],
      [36.972145,-122.023809],
      [36.971951,-122.023791],
      [36.971206,-122.023710],
      [36.970756,-122.023662],
      [36.970575,-122.023615],
      [36.970485,-122.023594],
      [36.970405,-122.023577],
      [36.970353,-122.023554],
      [36.970221,-122.023508],
      [36.969946,-122.023404],
      [36.969833,-122.023362],
      [36.969546,-122.023299],
      [36.969451,-122.023244],
      [36.969438,-122.023269],
      [36.969427,-122.023294],
      [36.969416,-122.023320],
      [36.969407,-122.023347],
      [36.969397,-122.023373],
      [36.969389,-122.023401],
      [36.969381,-122.023428],
      [36.969374,-122.023456],
      [36.969368,-122.023484],
      [36.969340,-122.023624],
      [36.969301,-122.023772],
      [36.969184,-122.024802],
      [36.969182,-122.024958],
      [36.969040,-122.026262],
      [36.968934,-122.027238],
      [36.969262,-122.027322],
      [36.969271,-122.027229],
      [36.969332,-122.026770],
      [36.969871,-122.026905],
      [36.970006,-122.026939],
      [36.970688,-122.027111],
      [36.970742,-122.027121],
      [36.970734,-122.027232],
      [36.970788,-122.027244],
      [36.971205,-122.027345],
      [36.971342,-122.027386],
      [36.971351,-122.027346],
      [36.971916,-122.027492],
      [36.971837,-122.027893],
      [36.971843,-122.028086],
      [36.971749,-122.028560],
      [36.972071,-122.028647],
      [36.972149,-122.028668],
      [36.972215,-122.028332],
      [36.972292,-122.028358],
      [36.972393,-122.028389],
      [36.972370,-122.028499],
      [36.972587,-122.028566],
      [36.972580,-122.028599],
      [36.972636,-122.028617],
      [36.972677,-122.028418],
      [36.972944,-122.028501],
      [36.973032,-122.028523],
      [36.972922,-122.029082],
      [36.973009,-122.029107],
      [36.973270,-122.029188],
      [36.973226,-122.029408],
      [36.973886,-122.029609],
      [36.974024,-122.029708],
      [36.974572,-122.029870],
      [36.974638,-122.029890],
      [36.974732,-122.029426],
      [36.974799,-122.029444],
      [36.975348,-122.029615],
      [36.975429,-122.029638],
      [36.975556,-122.029008],
      [36.976232,-122.029218],
      [36.976389,-122.028416],
      [36.976457,-122.028437],
      [36.976714,-122.028516],
      [36.976737,-122.028448],
      [36.976750,-122.028453],
      [36.976756,-122.028436],
      [36.976822,-122.028459],
      [36.976960,-122.028352],
      [36.976941,-122.027431],
      [36.977068,-122.027430],
      [36.977203,-122.027427],
      [36.977208,-122.027458],
      [36.977299,-122.027433],
      [36.977299,-122.027411],
      [36.977672,-122.027401],
      [36.977682,-122.027401],
      [36.977694,-122.027402],
      [36.977711,-122.027403],
      [36.977760,-122.027406],
      [36.977780,-122.027408],
      [36.977793,-122.027413],
      [36.977850,-122.027443],
      [36.977855,-122.027383],
      [36.977889,-122.027386],
      [36.977879,-122.027198],
      [36.977941,-122.027112],
      [36.978409,-122.027084],
      [36.978788,-122.027052],
      [36.978751,-122.026944],
      [36.978550,-122.026541],
      [36.978177,-122.025845],
      [36.978061,-122.025866],
      [36.977983,-122.025881],
      [36.977916,-122.025894]
    ];
    return this.ptInPoly(latlng, downtown);
  },

  // TODO: Document this function (point in polygon algorithm?)
  ptInPoly:function(latlng, polyCords){
    var pointX = latlng[0];
    var pointY = latlng[1];
    var i, j, c = 0;
    for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++){
      if (((polyCords[i][1] > pointY) != (polyCords[j][1] > pointY)) && (pointX < (polyCords[j][0] - polyCords[i][0]) * (pointY - polyCords[i][1]) / (polyCords[j][1] - polyCords[i][1]) + polyCords[i][0])){
        c = !c;
      }
    }
    return c;
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
    return this;
  },

  render: function() {
    return this;
  },

  afterRender: function() {
    this.calculate();
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
    this.collection.addAnswer("tif_factor", factor);
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
