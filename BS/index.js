$(document).ready(function() {

    function Player(name) {
        this.name = name;
        this.bluff = [];
        this.currentPlayer = false;
        this.drop = {};
        this.hand = [];
    }

    let players = [];
    let discardPile = [];
    let discard = [];

    const suitBtn = document.getElementById("sSort");
    const numBtn = document.getElementById("nSort");
    const playBtn = document.getElementById("play");
    const bsBtn = document.getElementById("bs");

    const gameBox = document.getElementById("game");
    const p0 = document.getElementById("hand0");
    const p1 = document.getElementById("hand1");
    const bsBox = document.getElementById("bsPile");

    // Player will be able to change number of opponents 
    var player0 = new Player("Bob", p0);
    players.push(player0);
    var player1 = new Player("Jane", p1);
    players.push(player1);



    var card0 = "<div class='red card' id='#"
    var card1 = "<div class='card' id='#";
    var card2 = "'><p>";
    var card3 = "</div>";

    const clubs = ("2C,3C,4C,5C,6C,7C,8C,9C,10C,JC,QC,KC,AC,");
    const diamonds = ("2D,3D,4D,5D,6D,7D,8D,9D,10D,JD,QD,KD,AD,");
    const hearts = ("2H,3H,4H,5H,6H,7H,8H,9H,10H,JH,QH,KH,AH,");
    const spades = ("2S,3S,4S,5S,6S,7S,8S,9S,10S,JS,QS,KS,AS");

    let deck = (clubs + diamonds + hearts + spades).split(",");

    var cardR = "<div class='ocard' id='"
    var card0 = "<div class='red card' id='"
    var card1 = "<div class='card' id='";
    var card2 = "'><p>";
    var card3 = "";
    var card4 = "</p></div>";


    function shuffle(deck) {
        var i = 0;
        var j = 0;
        var temp = 0;
        for (i = deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * i + 1);
            temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
    }

    function dealCards(players) {
        const a = players.length;
        while (deck.length > 0) {
            for (let i = 0; i < a; i++) {
                players[i].hand.push(deck[0]);
                deck.shift();
            }
        }
        for (let j = 0; j < a; j++) {
            //console.log(players[j].name + " has the following hand: " + players[j].hand + ".\n");
            players[j].hand = sortHandBySuit(players[j]);
        }
    }

    function generateCards(arr) {
        var card = "";
        var divs = "";
        for (var i = 0; i < arr.length; i++) {
            let suit = arr[i].charAt(arr[i].length - 1);
            if (suit === "C") {
                card = card1 + arr[i] + card2;
                card3 = arr[i].slice(0, -1) + "&clubs;"
                card += card3 + card4;
            }
            if (suit === "D") {
                card = card0 + arr[i] + card2;
                card3 = arr[i].slice(0, -1) + "&diams;"
                card += card3 + card4;
            }
            if (suit === "H") {
                card = card0 + arr[i] + card2;
                card3 = arr[i].slice(0, -1) + "&hearts;"
                card += card3 + card4;
            }
            if (suit === "S") {
                card = card1 + arr[i] + card2;
                card3 = arr[i].slice(0, -1) + "&spades;"
                card += card3 + card4;
            }
            divs += card;
        }
        return divs;
    }

    function displayOpponentCards(player) {
        let hand = player.hand;
        var divs = "";
        hand.forEach(function(obj) {
            card = cardR + obj + card2 + card4;
            divs += card;
        });
        return divs;
    }

    function selectCards() {
        var cards = document.querySelectorAll(".card");
        cards.forEach(function(index) {
            $(index).on("click", function() {
                $(this).toggleClass("selected");
            });
        });
    }

    function sortCourt(hand, suit) {
        ///Sorting 10s and court cards into non-standard order
        court = [];
        for (var j = hand.length - 1; j >= 0; j--) {
            var num = hand[j].charAt(0);
            if (num === "Q") {
                court.push(hand[j]);
                hand.pop();
            }
            if (num === "K") {
                court.push(hand[j]);
                hand.pop();
            }
            if (num === "A") {
                court.push(hand[j]);
                hand.pop();
            }
            if (num === "J") {
                court.unshift(hand[j]);
                hand.pop();
            }
            if (num === "1" && hand[j].charAt(1) === "0") {
                court.unshift(hand[j]);
                hand.shift();
            }
        }
        return hand.concat(court);
    }

    function sortHandBySuit(player) {
        //console.log("sortHandBySuit for " + player.name);
        var newHand = [];
        var tempHand = [];
        var court = [];
        var hand = player.hand;
        //console.log("Sorting " + player.name + "'s hand...");

        function sortOneSuit(hand, suit) {
            tempHand = [];
            //console.log("Sorting " + player.name + "'s suit " + suit + "...");
            for (var i = 0; i < hand.length; i++) {
                var card = hand[i].charAt(hand[i].length - 1);
                if (card === suit) {
                    tempHand.push(hand[i]);
                }
            }
            tempHand = tempHand.sort();
            return sortCourt(tempHand, suit);
        }
        newHand = sortOneSuit(hand, "C").concat(sortOneSuit(hand, "D")).concat(sortOneSuit(hand, "H"));
        newHand = newHand.concat(sortOneSuit(hand, "S"));
        //console.log(player.name + "'s hand: " + newHand + " " + newHand.length);
        return newHand;
    }

    function sortHandByNumber(player) {
        //console.log("sortHandByNumber for " + player.name);
        var hand = player.hand;
        var court = [];
        var newHand = [];
        var Js = [];
        var Qs = [];
        var Ks = [];
        var As = [];
        var a = /[A-Z]/g;
        var n = /[0-9]/g;

        function sortHighCards(hand, char) {
            var tmp = [];
            for (var i = 0; i < hand.length; i++) {
                var num = hand[i].substring(0, hand[i].length - 1);
                if (num === char) {
                    tmp.push(hand[i]);
                }
            }
            return tmp;
        }

        for (var i = 2; i < 10; i++) {
            for (var j = 0; j < hand.length; j++) {
                var num = hand[j].charAt(0);
                if (num.match(i)) {
                    newHand.push(hand[j]);
                }
            }
        }

        court = court.concat(sortHighCards(hand, "10")).concat(sortHighCards(hand, "J"));
        court = court.concat(sortHighCards(hand, "Q")).concat(sortHighCards(hand, "K"));
        court = court.concat(sortHighCards(hand, "A"));
        return newHand.concat(court);
    }

    function discardFromHand(player, index) {
        for (var i = 0; i < player.hand.length; i++) {
            if (index.id === player.hand[i]) {
                player.hand[i] = false;
                discardPile.push(index.id);
            }
        }
    }

    function opponentTurn(player) {
        //choose discard
        discard = player.hand.slice(0, 3);
        let hand = player.hand;
        //transfer cards to pile
        for (var i = 0; i < discard.length; i++) {
            for (var j = 0; j < hand.length; j++) {
                if (discard[i] === hand[j]) {
                    discardPile.push(hand[j]);
                    hand[j] = false;
                }
            }
        }
        //announce discard and update hand
        $("#msg1").html(player.name + " discards " + discard.length + " cards.");
        player1.hand = player1.hand.filter(function(val) {
            return Boolean(val) });
        p1.innerHTML = displayOpponentCards(player1);
        //cleanup
        console.log("Player1 cards left: " + player1.hand.length);
        console.log(discardPile);
    }



    function callBS(caller, callee) {
        //show discards
        bsBox.innerHTML = generateCards(discard);
        //compare to bluff
        //if match, transfer to caller's hand
        //if not match, transfer to callee's hand
        //clear discard pile
        //continue play
    }



    function gameStart() {
        shuffle(deck);
        dealCards(players);
        p0.innerHTML = generateCards(player0.hand)
        p1.innerHTML = displayOpponentCards(players[1]);
        selectCards();
        //while(!gameOver) {
        player0.hand = sortHandByNumber(player0);
        //checkForBS();
        //checkWin();
        //}
    }


    ////Buttons
    $(suitBtn).on("click", function() {
        player0.hand = sortHandBySuit(player0);
        p0.innerHTML = generateCards(player0.hand);
        selectCards();
    });

    $(numBtn).on("click", function() {
        player0.hand = sortHandByNumber(player0);
        p0.innerHTML = generateCards(player0.hand);
        selectCards();
    });

    $(play).on("click", function() {
        var selection = document.querySelectorAll(".selected");
        selection.forEach(function(index) {
            discardFromHand(player0, index);
        });
        player0.hand = player0.hand.filter(function(val) {
            return Boolean(val) });
        p0.innerHTML = generateCards(player0.hand);
        console.log("Player0 cards left: " + player0.hand.length);
        selectCards();
        opponentTurn(player1);
    });

    $(bsBtn).on("click", function() {
        callBS(player0, player1);
    });

    gameStart();

});
