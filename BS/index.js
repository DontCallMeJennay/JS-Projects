function Player(name) {
	this.name = name;
	this.div = undefined;
	this.bluff = [];
	this.currentPlayer = false;
	this.drop = {};
	this.hand = [];
}

let players = [];

const gameBox = document.getElementById("game");
const p0 = document.getElementById("hand0");
const p1 = document.getElementById("hand1");
const p2 = document.getElementById("hand2");
const p3 = document.getElementById("hand3");

// Player will be able to change number of opponents 
var player0 = new Player("Bob", p0);
players.push(player0);
var player1 = new Player("Jane", p1);
players.push(player1);

let discard = [];

var card0 = "<div class='red card' id='#"
var card1 = "<div class='card' id='#";
var card2 = "'><p>";
var card3 = "</div>";

const clubs = ("2C,3C,4C,5C,6C,7C,8C,9C,10C,JC,QC,KC,AC,");
const diamonds = ("2D,3D,4D,5D,6D,7D,8D,9D,10D,JD,QD,KD,AD,");
const hearts = ("2H,3H,4H,5H,6H,7H,8H,9H,10H,JH,QH,KH,AH,");
const spades = ("2S,3S,4S,5S,6S,7S,8S,9S,10S,JS,QS,KS,AS");

let deck = (clubs + diamonds + hearts + spades).split(",");


function shuffle(deck) {
	var i = 0;
	var j = 0;
	var temp = 0;
	for (i=deck.length-1; i > 0; i--) {
		j = Math.floor(Math.random() * i+1);
		temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
}

function dealCards(players) {
	const a = players.length;
	while (deck.length > 0) {
		for (let i=0; i < a; i++) {
			players[i].hand.push(deck[0]);
			deck.shift();
		}
	}
	for (let j=0; j < a; j++) {
		console.log(players[j].name + " has the following hand: " + players[j].hand + ".\n");
		players[j].hand = sortHandBySuit(players[j]);
	}
}

var card0 = "<div class='red card' id='"
var card1 = "<div class='card' id='";
var card2 = "'><p>";
var card3 = "";
var card4 = "</p></div>";


function displayCards(player) {
    let hand = player.hand;
    console.log(hand.length);
    var divs = "";
    var card = "";
    for (var i = 0; i < hand.length; i++) {
        let suit = hand[i].charAt(hand[i].length - 1);
        if (suit === "C") {
            card = card1 + hand[i] + card2;
            card3 = hand[i].slice(0, -1) + "&clubs;"
            card += card3 + card4;
        }
        if (suit === "D") {
        	card = card0 + hand[i] + card2;
            card3 = hand[i].slice(0, -1) + "&diams;"
            card += card3 + card4;
        }
        if (suit === "H") {
        	card = card0 + hand[i] + card2;
            card3 = hand[i].slice(0, -1) + "&hearts;"
            card += card3 + card4;
        }
        if (suit === "S") {
        	card = card1 + hand[i] + card2;
            card3 = hand[i].slice(0, -1) + "&spades;"
            card += card3 + card4;
        }
        divs += card;
    }
    console.log(hand);
    return divs;
}

function sortHandBySuit(player) {
    var newHand = [];
    var tempHand = [];
    var court = [];
    var hand = player.hand;
    console.log("Sorting " + player.name + "'s hand...");

    function sortOneSuit(hand, suit) {
        tempHand = [];
        console.log("Sorting " + player.name + "'s suit " + suit + "...");
        for (var i = 0; i < hand.length; i++) {
            var card = hand[i].charAt(hand[i].length - 1);
            if (card === suit) {
                tempHand.push(hand[i]);
            }
        }

        tempHand.sort();

        ///Sorting 10s and court cards into non-standard order
        court = [];
        for (var j = tempHand.length-1; j >= 0; j--) {
            var num = tempHand[j].charAt(0);
            if (num === "Q") {
            	court.push(tempHand[j]);
                tempHand.pop();
            }
            if (num === "K") {
            	court.push(tempHand[j]);
                tempHand.pop();
            }
            if (num === "A") {
            	court.push(tempHand[j]);
                tempHand.pop();
            }
            if (num === "J") {
            	court.unshift(tempHand[j]);
                tempHand.pop();
            }
            if (num === "1" && tempHand[j].charAt(1) === "0") {
            	court.unshift(tempHand[j]);
                tempHand.shift();
            }
        }
        return tempHand.concat(court);
    }
    newHand = sortOneSuit(hand, "C").concat(sortOneSuit(hand, "D")).concat(sortOneSuit(hand, "H"));
    newHand = newHand.concat(sortOneSuit(hand, "S"));
    console.log("new Hand: " + newHand + " " + newHand.length);
    return newHand;
}

function gameStart() {
	shuffle(deck);
	dealCards(players);
	p0.innerHTML = displayCards(players[0]);
	//while(!gameOver) {
		for(let i=0; i < players.length; i++) {
			//checkBS();
			//checkWin();
			//p0.innerHTML = players[0].name + "'s hand: " + players[0].hand;
		}
	//}
}

gameStart();
