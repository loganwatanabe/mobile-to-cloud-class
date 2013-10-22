//Logan Watanabe
//javascript for the HW4

var nfl_teams;//a global variable, needed for getting news
var team_colour;//global needed to store team's color

$(function() { //document is loaded and ready


		//will load the teams upon the page loading
		//note, this gets data from a local file, but can also be accessed via the espn api: "http://api.espn.com/v1/sports/football/nfl/teams/?rostertype=active&dates=2013&apikey=xkzrbnrd6xa7mhd8ne74syvb"
		$.getJSON("nfl_teams.json", function(responseObject, diditwork){
			console.log(diditwork);
			nfl_teams = responseObject.sports[0].leagues[0].teams;//array full of objects with attributes
					
			//generating the sidebar and each team's button
			for (i=0; i<nfl_teams.length;i++){
				var team = nfl_teams[i];
				var location = team["location"];
				var name = team["name"];
				var team_color = team["color"];
				var abbreviation = team["abbreviation"]

				var side = "<button class='team_button' id = \"" + abbreviation + "\">"+ location + " " + name +"</button>";

				$("#nfl_list").append(side);
				$("#"+abbreviation).css("background-color", team_color);//coloring the button its team's color
				$("#"+abbreviation).css("color", "white");
			}//creates the teams
		});//in the getJSON








	$("#nfl_list").on("click","button", function(){

		//first, clear the stories area
		$("#stories").empty();


		//then fill it with team stories
		var abbr = $(this).attr("id"); //get the id
		var team_obj = nfl_teams.filter(function(team){ return team.abbreviation == abbr});//access the nfl_team to get the correct team object
		var id_num = team_obj[0].id;//grab that team's id number

		var title = "<h2 id='team_title' style='color:" + team_obj[0].color + "' class='text-center'>"+ team_obj[0].location+ " " + team_obj[0].name +"</h2>"
		$("#stories").append(title);

		$.getJSON("http://api.espn.com/v1/sports/football/nfl/news/?teams="+id_num+"&limit=10&apikey=xkzrbnrd6xa7mhd8ne74syvb", function(responseObject, diditwork){//getJSON with the headlines api and teamid
			console.log(diditwork);
			var headlines = responseObject.headlines;//get the headlines object (an array of headlines, limited to 10)


			for(i=0;i<headlines.length;i++){	//iterate through headlines to create html content
				var news=headlines[i];
				var head = news.headline;
				if(head==undefined)//some don't have headlines
				{
					head = news.title;
				}

				var text_content = "<div id='" + abbr + i + "' class='well story'><div class='headline'><h4>" + head + "</h4></div> <br> <div class='news_content'>";

				if(news.images.length > 0)//if there is an image, this will add an image and caption
				{
					var img_obj=news.images[0];
					text_content+= "<img class='pagination-center news_img' src = '" + img_obj.url + "'><br><h6 class='text-center'>"+ img_obj.caption +"</h6><br>";
				}

				//adds description and link to full story
				text_content+= "<div class='description'>"+news.description+"<br> <a href='"+ news.links.web.href +"'>Read more...</a></div>";
									  	
				text_content+="</div></div>";


				$("#stories").append(text_content);//puts it on the page

			}

				$(".news_content").each(function(){$(this).hide()});//collapse all stories




				team_colour = team_obj[0].color;
				$("#toggle_background").show();//show the button to change background to team color

		});//end of getJSON
	});//end of load news






		//once all the news is loaded, we want to toggle slide on to only show one at a time
		$("#stories").on("click", ".story", function(){
			$(this).siblings().find(".news_content").slideUp();
			$(this).find(".news_content").slideToggle();
		});



		$("#toggle_background").on("click", function(){

			if($("body").css("background-color")=="rgb(255, 255, 255)"){	//if the background is white
				$("body").css("background-color", team_colour);					//change it to different color
				$("#team_title").css("color", "white");						//make the team name readable
			}
			else{
				$("body").css("background-color", "#FFFFFF");		//change it back to white
				$("#team_title").css("color", team_colour);			//and change the text color back
			}

		});



});//onReady