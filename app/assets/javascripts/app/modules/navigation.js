define([
  // Application.
  "app",
  "modules/util"
],

// Map dependencies from above array.
function(app, util) {

  // Create a new module.
  var Navigation = app.module();

  // Default model.
  Navigation.Model = Backbone.Model.extend({
    name: 'navigation'
  
  });

  // Default collection.
  Navigation.Collection = Backbone.Collection.extend({
    model: Navigation.Model
  });

  // Main nav view
  Navigation.Views.Main = Backbone.View.extend({
    
    template: "navigation",
    className: "span12",
    events: {},
    afterRender: function(){
          
      // Grab the navigation container and window.location
      var $nav = $(this.el),
          path = window.location.pathname.toLowerCase() || "";
      
      // For each link in the navigation
      $nav.find("a").each(function(i, el) {
        
        var $el = $(el),
            href = $el.attr("href") || "",
            dataSection = href.slice(1).split('/')[0] || "",
            pathSection = path.slice(1).split('/')[0] || "";
        
//        console.log('dataSection: ' + dataSection);
//        console.log('pathSection: ' + pathSection);
//        console.log('path: ' + path);
        
        // Unset class="current" from parent <li>
        $el.parent().removeClass("current");
        
        // If the link's href matches the path:
        if (dataSection === pathSection) {
          
          // Set class="current" on parent <li>
          $el.parent().addClass("current");
          
        }
      });
    },
    cleanup: function() {
      this.business.off(null, null, this);
      this.answers.off(null, null, this);
    }, 
    initialize: function(o) {
      this.business = o.business;
      this.business.on("change", this.render, this);
      this.answers = o.answers;
      this.answers.on("add", this.render, this);
      this.answers.on("change", this.render, this);
    }  
  });
  
  // Sub nav view
  Navigation.Views.Sub = Backbone.View.extend({
    
    template: "subnavigation",
    events: {},
    afterRender: function(){
          
      // Grab the navigation container and window.location
      var $nav = $(this.el),
          path = window.location.pathname.toLowerCase() || "";
      
      // Hide all submenus
      $nav.find("ol[data-section]").hide();
      
      // Remove all class="current
      $nav.find("a").removeClass("current");
      
      // For each link in the navigation
      $nav.find("a").each(function(i, el) {
        
        var $el = $(el),
            href = $el.attr("href") || "",
            dataSection = href.slice(1).split('/')[0] || "",
            pathSection = path.slice(1).split('/')[0] || "";
        
        // If the link's href matches the path:
        if (path === href) {
          // Set class="current" on the current link
          $el.addClass("current");
        }

        // If the first part of the link's href matches the first part of the path:
        if (dataSection === pathSection) {
          // Show the nav links for this section
          $nav.find("ol[data-section=" + dataSection + "]").show();
        }
      });
      this.updateNavByAnswers();
    },
    updateNavByAnswers: function(){
      this.$el.find("[data-show]").hide();

      // always show FBN
      this.$el.find("[data-show=fbn]").show();

      // show or hide based on home occ.
      if (this.answers.getAnswer("location_type", "") == "home") {
        this.$el.find("[data-show=home]").show();
      } else if (this.answers.getAnswer("location_type", "") == "commercial") {
        this.$el.find("[data-show=commercial]").show();

        var requirements = util.requirementsForBusinessType(this.answers.getAnswer("CIC_code"), this.answers.getAnswer("business_code"));
        for (var i = 0, len = requirements.length; i < len; i++) {
          this.$el.find("[data-show=" + requirements[i] + "]").show();
        }
      }

      // Show BID
      if (this.answers.getAnswer("bid", "")) {
        this.$el.find("[data-show=bid]").show();
      }
      
      // requirements menu is based of the requirements collection
      // TODO: only do this when the requirements collection changes
      // FIXME: don't do the above stuff related to requirements anymore
      var requirementsNav = this.$el.find("[data-section='requirements']").empty();
      this.requirements.forEach(function(requirement) {
        // TODO: check requirement.home_occ, requirement.commercial
        
        var navItem = document.createElement("li");
        var navLink = document.createElement("a");
        navLink.href = "/requirements/" + requirement.get("jurisdiction").toLowerCase() + "/" + requirement.get("short_name");
        navLink.appendChild(document.createTextNode(requirement.get("name")));
        navItem.appendChild(navLink);
        requirementsNav.append(navItem);
      });
    },
    cleanup: function() {
      this.business.off(null, null, this);
      this.answers.off(null, null, this);
    }, 
    initialize: function(o) {
      this.business = o.business;
      this.business.on("change", this.render, this);
      this.answers = o.answers;
      this.answers.on("add", this.render, this);
      this.answers.on("change", this.render, this);
      this.requirements = o.requirements;
      this.requirements.on("change", this.render, this);
      this.requirements.on("reset", this.render, this);
    }  
  });

  
  // Return the module for AMD compliance.
  return Navigation;

});
