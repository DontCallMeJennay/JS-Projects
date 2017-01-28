//What a mess.

var btnArr = [
	["r", "#A00", "#F00", "sound0"], 
	["g", "#0A0", "#0F0", "sound1"], 
	["b", "#00A", "#00F", "sound2"], 
	["y", "#AA0", "#FF0", "sound3"]];

var beeps = document.getElementsByTagName("audio");

function btnPress(id, color1, color2, beep) {
	var canvas = document.getElementById(id);
	canvas.style.backgroundColor = color2;
	setTimeout(function(){
		canvas.style.backgroundColor = color1;
		}, 800);
	beep.play();
}

function setButtons(i) {
	var id = btnArr[i][0];
	var color1 = btnArr[i][1];
	var color2 = btnArr[i][2];
	var beep = document.getElementById(btnArr[i][3]);
  var btn = document.getElementById(id);
	
	btn.addEventListener("click", function() {
		btnPress(id, color1, color2, beep);
		setTimeout(function() {
			randomBeep();
		}, 1000);
		yourArr.push(id);
		console.log(yourArr);
	});
}

function randomBeep() {
	for (i=0; i < gameArr.length; i++){
		cpuMove(i);
	}
	var r = Math.round((Math.random()*300)/100);
	var id = btnArr[r][0];
	var color1 = btnArr[r][1];
	var color2 = btnArr[r][2];
	var beep = document.getElementById(btnArr[r][3]);
	btnPress(id, color1, color2, beep);
	gameArr.push(id);
	console.log(gameArr);
}

function cpuMove(i) {
		setTimeout(function(){
			var id = btnArr[i][0];
			var color1 = btnArr[i][1];
			var color2 = btnArr[i][2];
			var beep = document.getElementById(btnArr[i][3]);
			btnPress(id, color1, color2, beep);
		}, 500);
}
	


for (var i=0; i < btnArr.length; i++) {
	setButtons(i);
}

var gameArr = [];
var yourArr = [];

setTimeout(function(){
	randomBeep();
}, 1000);