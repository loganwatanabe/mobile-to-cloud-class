


jQuery(document).ready(function() {//on the document ready



  // Get the sizes
  $.getJSON("sizes.json", function(responseObject) {
    //will load the size options
      for(size in responseObject){
        $("<button class='size_butt' id='"+size+"'>"+ size +"</button>").appendTo("#sizes").data("price", responseObject[size]);
      }

        //after the toppings and sizes have been loaded, respond to clicks
        $("#sizes").on("click", "button", function(){
          //remove all previous sizes from pricing
          $("#pizza_size").empty();

          //put a new value in price table
          var size = $(this).text();
          var price = $("#"+size+"").data("price").toFixed(2);
          $("<td>"+ size +"</td><td>"+ price +"</td>").appendTo("#pizza_size").data("cost", price).attr("id", "siz");

          //update total cost
          calculateCost();


        });

    });




  $.getJSON("toppings.json", function(responseObject) {
    //will load the topping options
    for (topping in responseObject) {
      $("<button class='top_butt' id='"+topping+"'>"+ topping +"</button>").appendTo("#toppings").data("price", responseObject[topping]);
    };



      $("#toppings").on("click", "button" ,function(){
          //remove all previous toppings from pricing
          $("#pizza_topping").empty();

          //put a new value in price table
          var topping = $(this).text();
          var price = $("#"+topping+"").data("price").toFixed(2);
          $("<td>"+ topping +"</td><td>"+ price +"</td>").appendTo("#pizza_topping").data("cost", price).attr("id", "top");

          //update total cost
          calculateCost();
      
        });
  });


});



  function calculateCost(){

    //calculate total cost
      var tot = (Number($("#top").data("cost")) +  Number($("#siz").data("cost"))).toFixed(2);
      //remove old total
      $("#total_price").empty();
      //put in new total
      $("#total_price").append(tot);
  }