OC.routing = {};

OC.routing.handleClick = function(){


    $(document).on("click", "a:not([data-bypass])", function(evt) {
        // Get the absolute anchor href.
        var href = $(this).attr("href");
        var protocol = this.protocol + "//";

        // Ensure the protocol is not part of URL, meaning it's relative.
        if (href && href.slice(0, protocol.length) !== protocol &&
            href.indexOf("javascript:") !== 0  &&
            href.indexOf("mailto:") !== 0) {

            hash = href.replace(/^[#|\/]/, "")
            evt.preventDefault();

            OC.routing.navigate(hash, true);
        }
    });
}

OC.routing.init = function(){
    OC.routing.handleClick();
    window.onpopstate = function(event){
        if(window.location.hash == ""){
            // we are home. show welcome
            OC.routing.showPanel("intro");
        }else{
            var hash = window.location.hash.replace(/^\#/, "");
            OC.routing.showPanel(hash);
        }
    }
}

OC.routing.showPanel = function(panelId){
    $("section.content > div").hide();
    $("div#"+panelId).show();
}
OC.routing.navigate = function(hash, addToHistory){
    OC.routing.showPanel(hash);
    // add to history
    history.pushState({"page":hash}, hash, "#"+hash);
   

    
}