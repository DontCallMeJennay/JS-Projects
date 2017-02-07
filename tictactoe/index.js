var A = []; var B = [];
var a = 'X'; var b = 'O';
var winConditions = [
	[0,1,2],
	[0,3,6],
	[0,4,8],
	[1,4,7],
	[2,4,6],
	[2,5,8],
	[3,4,5],
	[6,7,8]
]
var win = false;

var resetBtn = document.getElementById('resetter');
resetBtn.style.visibility = "hidden";
resetBtn.addEventListener("click", function(){
	location.reload(false);
});

var squares = document.getElementsByClassName('tttbox');
for (var i=0; i < squares.length; i++) {
	var x = squares[i].getAttribute('id');
	squares[i].style.display = "none";
	setButton(x);
}

function pickMark(){
	var msg = document.getElementById("message");
	var xes = document.getElementById("xButton");
	var os = document.getElementById("oButton");
	xes.addEventListener("click", function(){
		msg.style.visibility = "hidden";
		xes.removeEventListener("click", arguments.callee);
		for (var i=0; i < squares.length; i++) {
			squares[i].style.display = "initial";
		}
	});
	os.addEventListener("click", function(){
		a = "O"; b = "X";
		msg.style.visibility = "hidden";
		os.removeEventListener("click", arguments.callee);
		for (var i=0; i < squares.length; i++) {
			squares[i].style.display = "initial";
		}
	});
}

function setButton(id) {
var canvas = document.getElementById(id);
canvas.marked = false;
canvas.addEventListener("click", function() {
	if (canvas.marked === false && win === false) {
		a === 'X' ? drawA(canvas) : drawB(canvas);
		canvas.marked = true;
		A.push(Number(id));
		canvas.removeEventListener("click", arguments.callee);
		checkWin(A, a);
		checkWin(B, b);
		if (win === false) {
			setTimeout(function() {
				cpuDecide();
			}, 200); 
		}
	}
});
}

function checkWin(arr, id) {
	A = A.sort(); B = B.sort();
	for (var i=0; i < winConditions.length; i++) {
		if(arr.includes(winConditions[i][0]) && arr.includes(winConditions[i][1]) && arr.includes(winConditions[i][2])) {
			win = true;
			var winID = i;
			var msg = document.getElementById('message');
			msg.style.visibility = "visible";
			msg.innerHTML = id + " wins!"
			changeColor(winID);
			resetBtn.style.visibility="visible";	
		} 						
		if(A.length + B.length === 9 && win === false){
			win = true;
			var msg = document.getElementById('message');
			msg.style.visibility = "visible";
			msg.innerHTML = "No one wins :("
			resetBtn.style.visibility="visible";
		}
	}
}


function cpuDecide() {
	var q = Math.floor(Math.random()*9);
		console.log('random # is ' + q);
	var choice = squares[q];
	var s = choice.getAttribute('id');
  if (choice.marked === false && win === false) {
		console.log('Square ' + s + ' is clear.')
		a === 'O' ? drawA(choice) : drawB(choice);
		choice.marked = true;
		console.log('Square ' + s + ' marked as taken: ' + choice.marked);
		B.push(Number(s));
		checkWin(A, a);
		checkWin(B, b);
		} else if (choice.marked === true && (A.length + B.length !== 9)){
			console.log('Square ' + s + ' is taken. Rerolling...')
			cpuDecide();
		}
	}

function drawA(id) {
	var ctx = id.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(25,25);
	ctx.lineTo(75,75);
	ctx.moveTo(25,75);
	ctx.lineTo(75,25);
	ctx.closePath();
	ctx.lineWidth = 5;
	ctx.lineCap = 'round';
	ctx.strokeStyle = '#2F1500';
	ctx.stroke();
}

function drawB(id) {
	var ctx = id.getContext('2d');
	var centerX = id.width/2;
	var centerY = id.height/2;
	var radius = 30;
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
	ctx.closePath();
	ctx.lineWidth = 5;
	ctx.lineCap = 'round';
	ctx.strokeStyle = '#2F1500';
	ctx.stroke();
}

function changeColor(id) {
	var x = winConditions[id];
	console.log(x);
	for (var i=0; i < x.length; i++) {
		var square = document.getElementById(x[i]);
		square.style.background = "radial-gradient(ellipse, #79451A, #A5A)";
	}
}

pickMark();
