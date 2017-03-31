$(document).ready(function(){

//[location, minimum time, lat, lon , completion time]
var blotter = document.getElementById("list");
var locs = 
	[
		{"location": "Home", "time": "16", "lat": "47.586750", "lon":"-122.322034"},
		{"location": "Airfield", "time": "16.75", "lat": "47.492128", "lon": "-122.211286"},
		{"location": "Valley Hospital", "time": "17", "lat": "47.444767", "lon": "-122.200325"},
		{"location": "Maple Valley", "time": "17", "lat": "47.388039", "lon": "-122.042088"},
		{"location": "West Valley", "time": "18.25", "lat": "47.441283", "lon": "-122.245595"},
		{"location": "Burien", "time": "20", "lat": "47.471260", "lon": "-122.332723" },
		{"location": "Des Moines", "time": "19.5", "lat": "47.392869", "lon": "-122.313345"},
		{"location": "Home (first drop)", "time": "20.25", "lat": "47.586750", "lon": "-122.322034"},
		{"location": "Kent Station", "time": "20.5", "lat": "47.386660", "lon": "-122.237344"},
		{"location": "104th", "time": "20.5", "lat": "47.386964", "lon": "-122.202209"},
		{"location": "Talbot", "time": "20.5", "lat": "47.441112", "lon": "-122.212894"},
		{"location": "Southcenter", "time": "19.5", "lat": "47.458212", "lon": "-122.249939"},
		{"location": "MLK", "time": "19", "lat": "47.538892", "lon":" -122.281851"},
		{"location": "VM Hospital", "time": "22.25", "lat": "47.609600", "lon": "-122.326876"},
		{"location": "Home (last drop)", "time": "23.75", "lat": "47.586750", "lon":"-122.322034"}
	]
	
/* What am I trying to do?
-From point 0, 
		enter time and 
		find the closest location that's available at that time.
-Go to that location.
-Remove that location from the list.

-Recalc until the list is empty.
*/

var options = getStopsReadyNow();
var currentLoc = options[0];

function getStopsReadyNow(){
	var currentHour = 20;
	var currentTime = new Date();
	$("#now").html(currentTime.toLocaleString());
	//var currentHour = currentTime.getHours();
	var arr = [];
	for (var i=0; i < locs.length; i++){
		if(locs[i].time <= currentHour){
			arr.push(locs[i]);
			delete locs[i];
		}
	}
	return arr;
}

//calcs distance between one neighborhood and another
function calcDistance(loc, dest) {
	var dN = Math.abs(dest.lat - loc.lat) * 100;
	var dW = Math.abs(dest.lon - loc.lon) * 100;
	var dT = (dN + dW).toPrecision(2);
	//console.log("The distance between " + loc.location + " and " + dest.location + " is " + dT);
	return dT;
}

	//calcs closest location from one point
	function calcClosest(loc) {
		if(options.length < 2){
			$("#stopList").html("Go to lunch! There are no stops available at this time.");
			console.log(locs);
		} else {
		var arr = [];
		for (var i=0; i < options.length; i++) {
		  var distance = calcDistance(loc, options[i]);
			arr.push([options[i], distance]);
		}
		arr.sort(function(a,b){
			return a[1] - b[1];
		});
		console.log(arr);
		options.splice(loc,1);
		$("#completedList").append("<p>" + loc.location + "</p>");
		console.log("The closest neighborhood to " + loc.location + " is " + arr[1][0].location + ".");
		$("#stopList").append("From " + loc.location + ", go to " + arr[1][0].location + ".<br>");
		currentLoc = arr[1][0];
		console.log("spliced " + loc.location);
		console.log("currentLoc: " + currentLoc.location);
		} 
		for (var i=0; i < options.length; i++) {
		  console.log(arr[i]);
	}
}

	$("#nextBtn").on("click", function(){
		calcClosest(currentLoc);
	});



});