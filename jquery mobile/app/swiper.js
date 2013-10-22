


$(document).on("pageinit", "[data-role='page'].is-page", function() {

      var page = "#" + $( this ).attr( "id" ),
        // Get the filename of the next page. We stored that in the data-next
        // attribute in the original markup.
        next = $( this ).jqmData( "next" ),
        // Get the filename of the previous page. We stored that in the data-prev
        // attribute in the original markup.
        prev = $( this ).jqmData( "prev" );

    if(next){
      $(page).on("swipeleft", function(event){
         $.mobile.changePage(next, { transition: "slide", dataURL: next});
      });
    }

    if(prev){
      $(page).on("swiperight", function(event){
         $.mobile.changePage(prev, { transition: "slide", reverse: true, dataURL: next});
      });
    }

});