//[location, minimum time, lat, lon , completion time]
var blotter = document.getElementById("list");
var locList = 
	[
		{"location": "Home", "time": "16:00", "ctime": "0", "lat": "47.586750", "lon":"-122.322034"},
		{"location": "Airfield", "time": "16:45", "ctime": "0:45", "lat": "47.492128", "lon": "-122.211286"},
		{"location": "Valley Hospital", "time": "17:00", "ctime": "0:30", "lat": "47.444767", "lon": "-122.200325"},
		{"location": "Maple Valley", "time": "17:00", "ctime": "1:00", "lat": "47.388039", "lon": "-122.042088"},
		{"location": "West Valley", "time": "18:15", "ctime": "0:15", "lat": "47.441283", "lon": "-122.245595"},
		{"location": "Burien", "time": "20:00", "ctime": "0:30", "lat": "47.471260", "lon": "-122.332723" },
		{"location": "Des Moines", "time": "19:30", "ctime": "0:30", "lat": "47.392869", "lon": "-122.313345"},
		{"location": "Home", "time": "20:15", "ctime": "0:45", "lat": "47.586750", "lon": "-122.322034"},
		{"location": "Kent Station", "time": "20:30", "ctime": "0:15", "lat": "47.386660", "lon": "-122.237344"},
		{"location": "104th", "time": "20:30", "ctime": "0:30", "lat": "47.386964", "lon": "-122.202209"},
		{"location": "Talbot", "time": "20:30", "ctime": "0:30", "lat": "47.441112", "lon": "-122.212894"},
		{"location": "Southcenter", "time": "21:15", "ctime": "0:30", "lat": "47.458212", "lon": "-122.249939"},
		{"location": "MLK", "time": "19:00", "ctime": "0:45", "lat": "47.538892", "lon":" -122.281851"},
		{"location": "VM Hospital", "time": "22:15", "ctime": "0:15", "lat": "47.609600", "lon": "-122.326876"},
		{"location": "Home", "time": "23:59", "ctime": "0", "lat": "47.586750", "lon":"-122.322034"}
	]
	
/* What am I trying to do?
-From point 0, 
		enter time and 
		find the closest location that's available at that time.
-Go to that location.
-Remove that location from the list.

-Recalc until the list is empty.
*/

//var currentTime = prompt("What time is it?");
var currentTime = 19;
var options = [];

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
	var arr = [];
	for (var i=0; i < locList.length; i++) {
	  var distance = calcDistance(loc, locList[i]);
		arr.push([locList[i].location, distance]);
	}
	arr.sort(function(a,b){
		return a[1] - b[1];
	});
	//console.log(arr);
	//console.log("The closest neighborhood to " + loc.location + " is " + arr[1][0] + ".");
	//console.log("The farthest neighborhood from " + loc.location + " is " + arr[arr.length-1][0] + ".")
	return arr[1][0];
}


calcClosest(locList[2]);


/*
// Generates all possible combinations
for (var i=0; i < locList.length; i++) {
	for (var j=0; j < locList.length; j++) {
	  compDistance(locList[i], locList[j]);	
	}
}
*/