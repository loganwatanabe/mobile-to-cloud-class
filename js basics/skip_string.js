//skip_string.js
//skip-a-letter code by Logan Watanabe for 67-328


//to see how the cypher works check out http://www.wikihow.com/Write-in-Skip-a-Letter-Code
//the only difference is I am keeping spaces in the final output, so it is not eactly the same and won't be
//as obvious as to the code.  Reccomended for short phrases, not paragraphs or long stuff like that.


String.prototype.skip = function() {

	s = this.toLowerCase();		//s is the string that we'll cypher
	var middle = Math.round(s.length/2);	//use this number to split the string later
	
	//creates 2 arrays, for the two halves of the string, with each element a character
	//also reversed the arrays so I can use pop()
	var front = s.substring(0,middle).split("").reverse();
	var back = s.substring(middle).split("").reverse();
	
	
	var combo = [];
	
	for(var i=0; i<s.length; i++){
		if(i%2 == 0){		//this allows us to alternately take from front and back arrays and put into combo
		combo.push(front.pop());
		}
		else{
		combo.push(back.pop());
		}
	}

	return combo.join(""); //returns one encoded string
}

var f = "fireman";
f.skip();

var phrase = "Show me the money!";
phrase.skip();

var h = "Forty-seven dollars";
h.skip();



