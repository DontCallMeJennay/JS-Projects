import sys
import random

#Dictionaries for point calculation and randomizing, respectively. Lots of 
#confusion here over how to handle the string "1" vs the integer 1.

cardvalue = {
"king": 10,
"queen": 10,
"jack": 10,
"ten": 10,
"nine": 9,
"eight": 8,
"seven": 7,
"six": 6,
"five": 5,
"four": 4,
"three": 3,
"two": 2,
"ace": 1,
"aceb": 11,
}

cards = {
"1": "ace",
"2": "two",
"3": "three",
"4": "four",
"5": "five",
"6": "six",
"7": "seven",
"8": "eight",
"9": "nine",
"10": "ten",
"11": "jack",
"12": "queen",
"13": "king"
}

#Score keeping variables, with way too many global declarations. Not sure if I'm 
#failing to grasp how encapsulation works, or if Python is just weird that way.

global score
score = 0
global dscore
dscore = 0
global wins
wins = 0
global losses
losses = 0

#Cards held by player and dealer, respectively
hand = []
dhand = []

#Where the game loop starts, just after the introduction
def gameStart():
	print "\n\nYour current score is %s wins and %s losses.\n" %(wins, losses)
	draw()

#Drawing a random card for the player. Suits are omitted since it's a non-visual game.
def draw():
	r = random.randint(1, len(cards))
	s = str(r)
	global card
	card = cards.get(s)
	print "Drawing card...\n"
	print "You drew a %s." % card
	global score
	if card == "ace":  #Giving aces multiple possible values, imperfectly.
		if score < 10:
			score += 10;
	else:
		pass
	hand.append(card)
	score += cardvalue.get(card)
	print "Your score so far is %s.\n" % score
	#print "Your hand contains: ", hand
	bjCheck()
	scoreCheck()

#Checking for a blackjack (first two cards being ace + court)...
def bjCheck():
	if len(hand) == 2 and "ace" in hand and ("king" in hand or "queen" in hand or "jack" in hand):
		print "Blackjack! You win!"
		win()
	else:
		pass
	
#...Then checking for other winning or losing conditions for the player...
def scoreCheck():
	global losses
	global wins
	if score == 21:
		print "21! You win!"
		win()
	elif score > 21:
		print "Your score is %s. You busted!" % score
		loss()
	else:
		choice()

#...And continuing the game if no conditions are met.
def choice():
	print "Now what?"
	print "1. Hit"
	print "2. Stand"
	print "3. Exit"
	choose = raw_input(">  ")
	if choose == "1":
		print "Okay, here's another card.\n"
		draw()
	elif choose == "2":
		print "Okay, you stop there.\n"
		print "Now it's the dealer's turn...\n"
		dealerDraw()
	elif choose == "3":
		exit(0)
	else:
		print "Please choose a valid option."
		choice()

#Once the player stands, the dealer draws his cards...
def dealerDraw():
	t = random.randint(1, len(cards))
	u = str(t)
	global dcard
	dcard = cards.get(u)
	print "The dealer drew a %s." % dcard
	global dscore
	if dcard == "ace":
		if dscore < 10:
			dscore += 10
		else:
			pass
	dscore += cardvalue.get(dcard)
	dhand.append(dcard)
	print "The dealer's score so far is %s.\n" % dscore
	#print "The dealer's hand contains: ", dhand
	dbjCheck()
	dScoreCheck()

#...checks for a blackjack...
def dbjCheck():
	if len(dhand) == 2 and "ace" in dhand and ("king" in dhand or "queen" in dhand or "jack" in dhand):
		print "Blackjack! The dealer wins!"
		loss()
	else:
		pass
	
#...and repeats drawing until a win, lose, or stand condition is met.
def dScoreCheck():
	if dscore == 21:
		print "21! You lose."
		loss()
	elif dscore > 21:
		print "The dealer has busted. You WIN!"
		win()
	elif dscore > 16:
		print "The dealer stands."
		scoreCompare()
	else:
		dealerDraw()

#Finally, the player's and dealer's scores are compared to determine a winner.
def scoreCompare():
	global losses
	global wins
	if dscore > score:
		print "The dealer beats you, %s to %s. Too bad!" % (dscore, score)
		loss()
	elif dscore < score: 
		print "You've outscored the dealer %s to %s. Lucky you!" % (score, dscore)
		win()
	else:
		print "You're tied at %s each. Tie goes to the dealer. Bummer!" % score
		loss()		

#Either condition resets the score, increments the W/L, and restarts the game loop.
def win():
	global score
	score = 0
	global dscore
	dscore = 0
	global wins
	wins +=1
	clearHand()
	playAgain()
	
def loss():
	global score
	score = 0
	global dscore
	dscore = 0
	global losses
	losses +=1
	clearHand()
	playAgain()

#Making sure the players give up their cards.
def clearHand():
	del hand[:]
	del dhand[:]

#The player can exit between games as well as from the choice menu.
def playAgain():
	print "Wanna play again? y/n"
	play = raw_input(">  ")
	if play == "y":
		gameStart()
	elif play =="n":
		exit(0)
	else:
		print "Please choose a valid option."
		playAgain()
	
#Finally, here's the game introduction and loop start.
print "\n\nWelcome to Blackjack!\n"
print "Draw as many cards as you like (hit) and stop when your score is high enough (stand)."
print "Try to get as close as you can to 21 points without going over."
print "The dealer is your opponent. (He hits on 16, stands on 17.)"
print "Good luck!"		

gameStart()

#This line is an edit to test how Github Desktop works.