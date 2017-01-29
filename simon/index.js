//Less of a mess, but nowhere near done.

var buttons = [
{	id: "r",
	color1: "#A00",
	color2: "#F00",
	sound: "sound0"}, 
{	id: "g",
	color1: "#0A0",
	color2: "#0F0",
	sound: "sound1"}, 
{	id: "b",
	color1: "#00A",
	color2: "#00F",
	sound: "sound2"}, 
{ id: "y",	
	color1: "#AA0",
	color2: "#FF0",
	sound: "sound3"}
	];

var yourArr = [];
var cpuArr = [];
	
function btnPress(obj) {
	var canvas = document.getElementById(obj.id);
	canvas.style.backgroundColor = obj.color2;
	setTimeout(function(){
		canvas.style.backgroundColor = obj.color1;
		}, 800);
	var beep = document.getElementById(obj.sound);
	beep.play();
}

function setButtons(obj) {
	var id = obj.id;
	var color1 = obj.color1;
	var color2 = obj.color2;
	var beep = document.getElementById(obj.sound);
 	var btn = document.getElementById(obj.id);
	
	btn.addEventListener("click", function() {
		btnPress(obj);
		setTimeout(function() {
			cpuMove();
		}, 1000);
		yourArr.push(id);
	});
}


function randomMove() {
	var r = Math.round(Math.random() * 3);
	console.log(r);
	var obj = buttons[r];
	setTimeout(function(){
		btnPress(obj);
		cpuArr.push(obj.id);
		console.log(cpuArr);
	}, 500);	
}

function findIndex(val) {
for (var i=0; i < buttons.length; i++) {
	if(val === buttons[i].id) {
		return buttons[i];
		}
	}
}

function cpuMove(id) {
	for (i=0; i < cpuArr.length; i++){
		var obj = findIndex(cpuArr[i]);
    if (obj){
		btnPress(buttons[i]);
		}
	}
	randomMove();
}
	
for (var i=0; i < 4; i++) {
	setButtons(buttons[i]);
}
