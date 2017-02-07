var lyrics = "empty";
var topics = ["Parent-child relationships", "Troubled teens", "Violence or warfare"];
var wordCount = {"baby": 0, "child": 0, "cry": 0,
							"drugs": 0, "gang": 0, "gun": 0, "jail": 0, 
							"kids": 0,"meth": 0, "parent": 0, "soldier": 0, "war": 0,
							"youth": 0};
var words = Object.keys(wordCount);
var checkBtn = document.getElementById("check");

//Parent-child relationships
var pc = ["baby", "child", "kids", "parent"];
	
//Troubled teens
var tt = ["cry", "drugs", "gun", "jail", "meth", "youth"];

//Violence or warfare
var vw = ["gang", "gun", "jail", "soldier", "war"];
	
function setLyrics() {
	for (var i=0; i < words.length; i++) {
		wordCount[words[i]] = 0;
	}
	lyrics = document.getElementById("testLyrics").value;
	checkForContent(words);
	checkForTheme(wordCount);
	console.log(wordCount);
}
	
function checkForContent(list) {
	var result = document.getElementById("results");
	result.innerHTML = "";
	console.log(result.innerHTML);
  for (var i=0; i < list.length; i++) {
		var x = lyrics.search(list[i]);
		if (x !== -1) { 
		  var a = lyrics.lastIndexOf("\n", x);
			var b = lyrics.lastIndexOf("\n", x+180);
			var word = list[i];
			var snip = lyrics.substr(a, x-a) + word.bold() + lyrics.substr(x+word.length, b-a);
			snip = snip.substr(0, lyrics.lastIndexOf(" "));
			wordCount[list[i]]++;
			result.innerHTML += "<p>... " + snip + " ...\n</p>";
		}	
	}
}

function checkForTheme(obj) {
	var copy = obj;
	var themes = document.getElementById("themes");
	themes.innerHTML = "";
	console.log(themes.innerHTML);
	var content = "This song appears to contain lyrics about ";
	if ((copy.child + copy.kids > 0) && copy.parent > 0) {
		themes.innerHTML = content + "parent-child relationships.";
	}
	var n = 0;
	for (var i=0; i < tt.length; i++) {
			n += copy[tt[i]];
	}
	if (n >= 2) {
			themes.innerHTML += content + "troubled teens.";
		}
	if (copy.gang + copy.gun + copy.jail + copy.soldier + copy.war > 2) {
		themes.innerHTML += content + "war or other violence.";
	} 
	if (!(themes.innerHTML)) {
		themes.innerHTML = "No categories found for this song."
	}
}

checkBtn.addEventListener("click", function(event) {
	setLyrics();
});
