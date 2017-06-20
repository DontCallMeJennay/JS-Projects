#callBS
A beginner project attempting to simulate a card game called "BS" or "Cheat".
Partly inspired by the Neopets.com version.

PLAN:

START
-Start with one OPPONENT, up to three
*shuffle() deck
*Player and opponent are each dealt() half the deck into their HANDS
*Print what cards the player has 	...and for debugging purposes, what the opponent has
	*Sort hand by suit
	*Sort hand by numbers
*Display your hand in an interact-able (?) fashion

TURN
*-Display which cards are in CURRENT_PLAYER'S hand
?-Choose up to 4 cards to DROP in discard pile
?-State BLUFF (quantity and value) of cards being discard()ed
*-Discard()
?-All players have option to callBS(this_PLAYER, CURRENT_PLAYER) or pass()

BS
*PLAYER callBS() on most recent CURRENT_PLAYER
*If BLUFF matches DROP, DISCARD pile goes into PLAYER's HAND
*If BLUFF !matches DROP, DISCARD pile goes into CURRENT_PLAYER's HAND
*DISCARD pile goes to 0

WIN
?-The PLAYER who discards all cards without being called out is the winner.