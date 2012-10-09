define([
  // Application.
  "app"
],

function(app) {

  var Util = app.module();

  Util.requirementsTypeLookup = {
    "100": ["food"],
    "200A": ["food"],
    "200B": ["food"],
    "200C": ["food"],
    "200F": ["food"],
    "200G": ["food"],
    "200H": ["food"],
    "200I": ["food"],
    "200J": ["food"],
    "200K": ["food"],
    "200L": ["food"],
    "200M": ["food", "alcohol"],
    "240A": ["food"],
    "240B": ["food"],
    "240C": ["food"],
    "240D": ["food"],
    "240E": ["food"],
    "240F": ["food"],
    "240G": ["food"],
    "240H": ["food"],
    "280A": ["food"],
    "280B": ["food"],
    "280C": ["food"],
    "280D": ["food"],
    "280E": ["food"],
    "280F": ["food"],
    "280G": ["food"],
    "280H": ["food"],
    "310J": ["food"]
  };

  Util.requirementsForBusinessType = function(cicCode, businessType) {
    var requirements = Util.requirementsTypeLookup[cicCode] || [];

    if (businessType.indexOf("Trade (Wholesale and Retail)") !== -1) {
      requirements.push("retail")
    }

    return requirements;
  };

  return Util;
});