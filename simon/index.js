//I think I'm barking up the wrong tree. Looking into game states...

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
	var beep = document.getElementById(obj.sound);
	beep.play();
	setTimeout(function(){
		canvas.style.backgroundColor = obj.color1;
		}, 800);
	console.log(cpuArr.length + " " + yourArr.length);
	if (cpuArr > 0 && yourArr.length === cpuArr.length) {
		setTimeout(function() {
			cpuNextMove();
			}, 1000);
		}
	}


function setButtons(obj) {
	var id = obj.id;
	var color1 = obj.color1;
	var color2 = obj.color2;
	var beep = document.getElementById(obj.sound);
    var btn = document.getElementById(obj.id);
	btn.addEventListener("click", function() {
		btnPress(obj);
		yourArr.push(obj.id);
		console.log("yourArr: " + yourArr);
	});
}

function gameStart(){
	for (var i=0; i < buttons.length; i++){
		setButtons(buttons[i]);
	}
	cpuNextMove();
}

function cpuNextMove(){
	var r = Math.round(Math.random() * 3);
	var obj = buttons[r];
	btnPress(obj);
	cpuArr.push(obj.id);
	console.log("cpuArr: " + cpuArr);
	if(yourArr.length > 0) {
		playerMove(yourArr[0], cpuArr[0]);
	}
}


function playerMove(x, y) {
	if (x === y) {
		console.log("match");
		playerMove(arr[x+1], arr[y+1]);
	} else {
		console.log("error");
	}
}

//Game starts.

//CPU makes a move, which gets stored.

//Player makes a move. 
	//If it matches the CPU's move, the game continues.
	//If it does not, an error is thrown,
			//and the player tries again in easy mode.
			//and the game is reset in hard mode.

//CPU makes a second move, which gets stored in a sequence (which can be up to 5 characters long).


//Player makes a second move.
	//If it matches the first move in the CPU's sequence, the player inputs another move.
		//If it matches the second move, the player inputs another move.
			//If it matches the third move, etc. etc. until the CPU's sequence has been matched.
				//If the entire sequence matches, 
					//a positive message is displayed,
					//and the CPU makes another random move.
	//If it does not, an error is thrown...

//Play continues until the player recalls 5 moves successfully.
	//Then a "YOU WIN" message displays, and all items reset.

gameStart();