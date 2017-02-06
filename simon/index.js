/*
Game states: Start, cpuTurn, yourTurn, End.

	While Start:
		Select Easy or Hard button.	
		Go to cpuTurn state.

	While cpuTurn:
		If cpuArray < 10,
			Pick a random color, play light and sound, and add it to the memory list (array).
			On the 2nd+ pass, play all the previous colors in sequence before adding a new one.
			Go to yourTurn state.
		If cpuArray >=10,
			Go to End state.

	While yourTurn:
		Click on a color.
		Check if it matches the first item in the CPU array.
			If yes, 
				let player pick again and check if it matches the second color...
				and pick again and see if it matches the third color...
				...as many times as there are items in the CPU array.
			If no,
				if Easy, error causes replay of turn.	
				if Hard, error causes end of game.
					Go to End state.
		If all checks are successful, go to cpuTurn state.

	While End:
		If end caused by error, display "YOU LOSE" and show Play Again button. Reset to Start state.
		If end caused by cpuArray exceeding 10, display "YOU WIN" and show Play Again button. 
			Reset to Start state.
*/



/*
Game states: Start, cpuTurn, yourTurn, End.

	While Start:
		Select Easy or Hard button.	
		Go to cpuTurn state.
*/

function gameStates(){

////GLOBAL (sorta) VARIABLES	
	var easy = document.getElementById("easy");
	var hard = document.getElementById("hard");
	var resetGame = document.getElementById("reset");
			resetGame.addEventListener("click", function(){
			resetGame();
		});

	var hardMode = false;

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

	var cpuArr = [];
	var turnCount = 0;


////GLOBAL FUNCTIONS

	function btnPress(obj) {
		var canvas = document.getElementById(obj.id);
		canvas.style.backgroundColor = obj.color2;
		var beep = document.getElementById(obj.sound);
		beep.play();
		console.log(obj.id + " beeped.");
		setTimeout(function(){
			canvas.style.backgroundColor = obj.color1;
			}, 500);
	}

	function clearButtons(obj) {
	    var btn = document.getElementById(obj.id);
		btn.removeEventListener("click", btn);
	}


////STATE FUNCTIONS and sub-functions

	function gameStart(){
		easy.addEventListener("click", function(){
			//console.log("hardMode: " + hardMode);
			cpuTurn();
		});
		hard.addEventListener("click", function(){
			hardMode = true;
			//console.log("hardMode: " + hardMode);
			cpuTurn();
		});	
	}

	function cpuTurn(){

		document.getElementById("easy").style.visibility = "hidden";
		document.getElementById("hard").style.visibility = "hidden";
		document.getElementById("reset").style.visibility = "hidden";

////Activates memorized button sequence
		function playList(str){
			var obj = buttons.filter(function(x){
				return x.id == str;
				});	
			console.log(obj[0]);
			btnPress(obj[0]);
			}

////Adds the next button to the sequence
		function cpuNextMove(){
			var r = Math.round(Math.random() * 3);
			var obj = buttons[r];
			cpuArr.push(obj.id);
			console.log("cpuArr: " + cpuArr);
			return obj;
		}

		for (var i=0; i < buttons.length; i++){
			clearButtons(buttons[i]);
		}

////begin turn

		if(cpuArr.length === 0){
			setTimeout(function(){
				btnPress(cpuNextMove());
				return yourTurn();
			}, 1000);
		} else {
			for (var i=0; i < cpuArr.length; i++){
				console.log(cpuArr[i]);
				setTimeout(function(){
					playList(cpuArr[i]);
					console.log("playList called on " + cpuArr[i]);
				}, 800*i);
			}
		}
	}


	function yourTurn(){

////Sets up the buttons to beep and check for pattern matches when clicked
		function setButtons(obj) {
		    var btn = document.getElementById(obj.id);
			btn.addEventListener("click", function() {
				btnPress(obj);
				arrCheck(obj.id);
			});
		}

////Checks whether your click matches the pattern
		function arrCheck(id){
			if(id === cpuArr[turnCount]) {
				//console.log(turnCount + " - Correct");
				turnCount++;
				if (turnCount === cpuArr.length) {
					turnCount = 0;
					setTimeout(function(){
						return cpuTurn();						
					}, 1000);
				}
			} else {
				//console.log("Incorrect, retry");
			}
		}


		for (var i=0; i < buttons.length; i++){
			setButtons(buttons[i]);
		}
	}

	function gameEnd(){

	}

	function resetGame(){

	}
	gameStart();
}

gameStates();
