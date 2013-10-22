//team.js
//a Team class by Logan Watanabe for 67-328

function Team(location, name, league, division, wins, losses){
	this.location = location;
	this.name = name;
	this.league = league;
	this.division = division;
	this.wins = wins;
	this.losses = losses;
}

Team.prototype.getName = function(){
	return this.location + " " + this.name;
};

Team.prototype.getRecord = function(){
	return this.wins + " - " + this.losses;
};

Team.prototype.getDivision = function(){
	return this.league + " " + this.division;
};



//demonstrating instantiating 2 objects of this class

var pit = new Team("Pittsburgh", "Steelers", "AFC", "North", 16, 0);

var sf = new Team("San Fransisco", "49ers", "NFC", "West", 12, 4);


//demonstrating using the methods

pit.getName();
pit.getRecord();
pit.getDivision();