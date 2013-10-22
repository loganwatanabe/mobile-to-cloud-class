//loading AFC teams via a .getJSON

  jQuery(document).ready(function() {    // do once original document loaded and ready


        $('form[name="afc_button"] input').click(function() {
                $.getJSON("afc.json", function(responseObject, diditwork) {
                        console.log(diditwork);
                        var displayText = "<ul id = \'afc_list\'><u>American Football Conference<\/u><br>";

                        var afc = [];
                        var north = [];
                        var south = [];
                        var east = [];
                        var west = [];

                        for (var i = 0; i<responseObject.teams.length; i++) {
                                var team = responseObject.teams[i];

                          if (team.division == "North"){north.push(team);}
                          else if (team.division == "South"){south.push(team);}
                          else if (team.division == "East"){east.push(team);}
                          else if (team.division == "West"){west.push(team);}
                        
                                }

                        afc.push(north);
                        afc.push(south);
                        afc.push(east);
                        afc.push(west);

                        for (var i = 0; i<afc.length; i++) {
                        var divis = afc[i];
                          displayText+="<ul class = \'afc_div "+ divis[i].division +"\'><b> AFC " + divis[i].division + "<\/b>";
                          for (var j = 0; j<divis.length; j++) {
                            var team = divis[j];
                            displayText+= "<li>" + team.location + " " + team.name + "<\/li>";
                          }
                            displayText+= "<\/ul>";
                        }


                $("#afcResponseArea").html(displayText);


                //manipulating the DOM
                            //click the division name to toggleSlide the team names
                 $(".afc_div").on("click",function(){  
                 $(this).find("li").slideToggle();
                  });


                } );  // getJSON

            //get rid of the button
            $('form[name="afc_button"] input').hide();

        } );  // click




    //functions used for manipulating the DOM

    $("#colorize").on("click", function colorize(){

      if($(".West") == undefined)
      {
        alert("nothing to color");
      }
      else
      {
      $(".West").css("background-color", "green");
      $(".East").css("background-color", "blue");
      $(".North").css("background-color", "red");
      $(".South").css("background-color", "orange");
      $(this).replaceWith("Colored!");
      }
    });

    $("#last_sb").on("click", function lastWinner(){
      $("li:contains('Ravens')").show().css("border-style", "groove").css("border-color", "yellow");
      $("li:contains('Ravens')").addClass("champ");
    });

    $("#next_sb").on("click", function newWinner(){
      $("li:contains('Steelers')").show().css("border-style", "groove").css("border-color", "yellow");
      $("li:contains('Steelers')").addClass("champ");
    });


    $("#peyton").on("click", function peyton(){
      $('<img src="peyton.png">').load(function(){
        $(this).insertBefore($("#peyton"));
        });
      $(this).hide();

    });

    $("#eli").on("click", function eli(){
      $('<img src="eli.png">').load(function(){
        $(this).insertAfter($("#eli"));
        });
      $(this).hide();
    });

      $("#nfl_button").on("click", function tog(){
        $("#nfl_logo").fadeToggle("slow", "linear");

      });

  } ); // onReady




//JSON loading via XMLHttpRequest loading nfc teams

function doXMLHttpRequest() {
  var xhr = new XMLHttpRequest(); 

  xhr.onreadystatechange=function()  {
   if (xhr.readyState==4) {
     if(xhr.status == 200) {
        processResponse(xhr.responseText);
    } else {
      nfcResponseArea.innerHTML="Error code " + xhr.status;
    }
   }
  }
  xhr.open("GET", "nfc.json", true); 
  xhr.send(null); 
  } 

  function processResponse(responseJSON) {
        var responseObject = JSON.parse(responseJSON);
        var displayText = "<ul id = \'nfc_list\'><u>National Football Conference<\/u><br>";

        var nfc = [];
        var north = [];
        var south = [];
        var east = [];
        var west = [];

        for (var i = 0; i<responseObject.teams.length; i++) {
                var team = responseObject.teams[i];

          if (team.division == "North"){north.push(team);}
          else if (team.division == "South"){south.push(team);}
          else if (team.division == "East"){east.push(team);}
          else if (team.division == "West"){west.push(team);}
        
                }

        nfc.push(north);
        nfc.push(south);
        nfc.push(east);
        nfc.push(west);

        for (var i = 0; i<nfc.length; i++) {
        var divis = nfc[i];
          displayText+= "<ul class = \'nfc_div "+ divis[i].division +"\'><b> NFC " + divis[i].division + "<\/b>";
          for (var j = 0; j<divis.length; j++) {
            var team = divis[j];
            displayText+= "<li>" + team.location + " " + team.name + "<\/li>";
          }
            displayText+= "<\/ul>";
        }
        document.getElementById("nfcResponseArea").innerHTML = displayText;

        //manipulating the DOM
        //click the division name to toggleSlide the team names
        $('form[name="nfc_button"]').hide();

       $(".nfc_div").on("click",function(){  
       $(this).find("li").slideToggle();
        });


    }