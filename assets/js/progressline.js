/// SCRATCHPAD ///

(function( $ ){

  $.fn.progressLine = function() {
    
    // Find the width of the progress line
    var progressLineWidth = $(".progress-line").width();
    
    this.each(function() {
    });
    

  };
})( jQuery );


<nav id="sitenav">
  <ul>
    <li><a href="#anchor1">Anchor 1 Text</a></li>
    <li><a href="#anchor2">Anchor 2 Text</a></li>
    <li><a href="#anchor3">Anchor 3 Text</a></li>
    <li><a href="#anchor4">Anchor 4 Text</a></li>
    <li><a href="#anchor5">Anchor 5 Text</a></li>
  </ul>
</nav>

<div id="anchor1"></div>
<div id=""


$('#sitenav').progressLine();



update_menu_line: function(a) {
  var b = $(".ui-menu-bottom-line").width();
  a += Pitchdeck._.menu_height;
  var c = !1;
  $(Pitchdeck._.frames).each(function(d) {
      var e = $(this).offset().top, f = e + $(this).height();
      if (a >= e && a < f) {
          var g = $(".ui-menu a[href=#" + $(this).attr("id") + "]");
          if (g.length > 0) {
              c = !0;
              var h = 34;
              b = g.position().left + Math.floor(g.width() / 2);
              var i = (a - e) / $(this).height();
              b += (h + Math.floor(g.width())) * i.toPrecision(2)
          }
          return
      }
  }), c || (b = $(".ui-menu").width()), $(".ui-menu-bottom-line").width(b)