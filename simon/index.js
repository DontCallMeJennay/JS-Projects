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

////QUICK! UPLOAD IT WHILE IT STILL WORKS!

function gameStates(){

////GLOBAL (sorta) VARIABLES
	var lose = undefined;	
	var easy = document.getElementById("easy");
	var hard = document.getElementById("hard");
	var resetBtn = document.getElementById("reset");
			resetBtn.addEventListener("click", function(){
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
		setTimeout(function(){
			canvas.style.backgroundColor = obj.color1;
			}, 500);
	}

////STATE FUNCTIONS and sub-functions

	function gameStart(){
		easy.addEventListener("click", function(){
			return cpuTurn();
		});
		hard.addEventListener("click", function(){
			hardMode = true;
			return cpuTurn();
		});	
	}

	function cpuTurn(){

		document.getElementById("easy").style.visibility = "hidden";
		document.getElementById("hard").style.visibility = "hidden";
		document.getElementById("reset").style.visibility = "hidden";

	////Adds the next button to the sequence
		function cpuNextMove(){
			var r = Math.round(Math.random() * 3);
			var obj = buttons[r];
			cpuArr.push(obj.id);
			console.log("cpuArr: " + cpuArr);
		}

	////Activates memorized button sequence
		function playList(str, index){
			var obj = buttons.filter(function(x){
				return x.id == str;
				});	
			setTimeout(function(){
				btnPress(obj[0]);
			}, 700*(index+1));
			}

	////begin turn

		if(cpuArr.length > 5){
			lose = false;
			return gameEnd();
		}

		if(cpuArr.length === 0){
			setTimeout(function(){
				cpuNextMove();
				playList(cpuArr[0],0);
				return yourTurn();
			}, 500);
		} else {
			cpuNextMove();
			for (var i=0; i < cpuArr.length; i++){
				var x = cpuArr[i];
				playList(x, i);
			}
			return yourTurn();
		}
	}

	function yourTurn(){

	////Sets up the buttons to beep and check for pattern matches when clicked
		function setButtons(obj) {
		    var btn = document.getElementById(obj.id);
			btn.addEventListener("click", function() {
				btnPress(obj);
				arrCheck(obj.id);
				console.log("arrCheck() triggered for button " + obj.id);
			}, true);
		}

		function clearButtons(obj) {
		    var btn = document.getElementById(obj.id);
		    btn.removeEventListener("click", setButtons)
			btn.removeEventListener("click", arrCheck);
			//console.log("clearButtons triggered on " + obj.id);
		}

	////Checks whether your click matches the pattern
		function arrCheck(id){
			//console.log("id: " + id + " turnCount: " + turnCount + " cpuArr: " + cpuArr[turnCount]);
			if(id === cpuArr[turnCount]) {
			for (var i=0; i < buttons.length; i++){
				clearButtons(buttons[i]);
				}
				turnCount++;
				if (turnCount === cpuArr.length) {
					turnCount = 0;
					setTimeout(function(){
						return cpuTurn();						
					}, 700);
				}
			} 	
		}
		
		for (var i=0; i < buttons.length; i++){
			setButtons(buttons[i]);
			//console.log("setButtons triggered on " + buttons[i].id);
		}
	}

	function gameEnd(){
		if (lose === false) {
			console.log("YOU WIN!");
			document.getElementById("reset").style.visibility = "visible";
		}
		if (lose === true) {
			console.log("YOU LOSE.");
			document.getElementById("reset").style.visibility = "visible";
		}
	}

	function resetGame(){
		location.reload();
	}

	gameStart();
}

gameStates();