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
    // TODO: put the js from the standalone widget here
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
    // TODO: fill in the form with values from answers.
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
