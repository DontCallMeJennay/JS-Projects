# Jenni Corbus
# Project resumed 16 February 2016
# Based on "Learning Python the Hard Way" exercises 45-47.

# For the record, the countries and locations mentioned in this game were chosen for no other reason than variety, 
# and the characters and their gifts were just off-the-cuff ideas.  I hope none of the jokes or tropes found here are harmful.

# importing modules and setting starting variables
import random
from sys import exit
import themap
import people

i=1  # i tracks your position in each country's map sequence (village, town, city, capital)
giftlist=[]

# Classes for world leaders and how they respond to your overtures
class Leader(object):
	def __init__(self, name):
		self.name = name
	def giftRespond(self, gift):
		if gift in goodgifts:
			print "%s loves your gift!" % people.leaders[route]
			giftlist.remove(gift)
			giftlist.remove('None')
			Success()
		else:
			print "%s seems unimpressed by your gift." % people.leaders[route]
			Failure()
		
class Obama(Leader):
	def talkRespond(self, atty):
		if atty == 'meek':
			Success()
		elif atty == 'haughty':
			Jerk()
			Failure()
		elif atty == 'polite':
			Success()
		else:
			pass
	global goodgifts
	
class Park(Leader):
	def talkRespond(self, atty):
		if atty == 'meek':
			Doormat()
			Failure()
		elif atty == 'haughty':
			Success()
		elif atty == 'polite':
			Success()
		else:
			pass
		global goodgifts
	
class Putin(Leader):
	def talkRespond(self, atty):
		if atty == 'meek':
			Doormat()
			Failure()
		elif atty == 'haughty':
			Success()
		elif atty == 'polite':
			Success()
		else:
			pass
	global goodgifts
		
class Roussef(Leader):
	def talkRespond(self, atty):
		if atty == 'meek':
			Doormat()
			Failure()
		elif atty == 'haughty':
			Jerk()
			Failure()
		elif atty == 'polite':
			Doormat()
			Failure()
		else:
			pass
	global goodgifts

class Merkel(Leader):
	def talkRespond(self, atty):
		if atty == 'meek':
			Doormat()
			Failure()
		elif atty == 'haughty':
			Jerk()
			Failure()
		elif atty == 'polite':
			Success()
		else:
			pass
	global goodgifts

# Intro text

print """
########################################################################################
		WE COME IN PEACE
a really bad computer game by Jenni Corbus
########################################################################################
Ambassador Kleebork,
Congratulations on being chosen to make our final attempt at contact with Earth's 
civilizations. We regret that we must deny your request for further resources; 
military pacification is out of the question, and our prior attempts at clandestine 
observation have been... ineffective.  Your universal translator and sense of tact are 
our last, best hope for befriending the Earthlings. Good luck!
	Regards,
	Glorax-6 High Command
########################################################################################
	
As you finish reading your orders, you see the ship zip away, leaving 
you in a clearing near a remote village.  It's a long walk to the capital, but at least there 
won't be a repeat of the "flying saucers" hysteria.
"""
###############################

# Starting the game

def GameStart():
	global i 
	i = 1
	x = random.randint(0, len(themap.drop_point)-1) # A random number generator...
	global route
	route = themap.drop_point[x]                    # ...which determines which country you start in.
	print "The next part of your quest begins in %s." % route
	print "You are now in the village of %s.\n" % themap.city1[route]
	city = themap.city1.get(route)
	Options()

# The main gameplay menu

def Options():
	print "What would you like to do?"
	print "1. Explore location"
	print "2. Talk to locals"
	print "3. Travel to the next town"
	print "4. Check your inventory.\n"
	choice = raw_input('> ')
	if choice == '1':
		explore()
	elif choice == '2':
		talk()
	elif choice == '3':
		print route
		cities()
	elif choice == '4':
		inventory()
	elif choice == 'exit':
		exit(0)
	else:
		print "Please choose a valid option:"
		Options()

# A special options menu for the capital

def Options2():
	print "What would you like to do?"
	print "1. Explore location"
	print "2. Leave the city!"
	print "3. Check your inventory"
	print "4. 'Take me to your leader, Earthlings.'\n"
	choice = raw_input('> ')
	if choice == '1':
		print "Now is a bad time to be walking around drawing attention.\n"
		Options2()
	elif choice == '2':
		print "Maybe it would be best to retreat and gather more information...\n"
		global i
		i = 1
		cities()
	elif choice == '3':
		print "You have the following items: %s" % giftlist	
		Options2()
	elif choice == '4':
		LeaderOptions()
	elif choice == 'exit':
		exit(0)
	else:
		print "Please choose a valid option:"
		Options2()
		
####################################

#Defining each menu option

def talk():
	y = random.randint(1,20)
	z = random.choice(people.locals.keys())
	print
	print "You meet %s.\n" % z 
	if y < 3:
		print "They give you %s!" % people.locals[z]
		print
		giftlist.append(people.locals[z])
	else:
		pass
	Options()

def explore():
	print "You explore the surrounding environs and find nothing (because the author is bored and uninspired at the moment.)\n"
	Options()

def cities():
	global i
	if i == 1:
		travel()
	elif i == 2:
		travel2()
	elif i == 3:
		capital()
	else:
		print "Please choose a valid option."
	Options()
	
def inventory():
	print "You have the following items: %s" % giftlist	
	Options()		

####################################

# Travel locations

def travel():
	global i
	city = themap.city2.get(route)
	print "You continue on toward the capital."
	print "Eventually you find yourself in %s.\n" % city
	i += 1
	Options()
	
def travel2():
	global i
	city = themap.city3.get(route)
	print "You continue on toward the capital."
	print "Eventually you find yourself in %s.\n" % city
	i += 1
	Options()
	
def capital():
	global i
	city = themap.capital.get(route)
	print "You have arrived in the capital city of %s." % city
	i += 1
	Options2()

############################

# Meeting a leader	

def	LeaderOptions():
	leaderMeet()
	print "You are offered the opportunity to meet with %s.\n" % people.leaders[route]
	print "How do you greet the leader?"
	print "1. Politely"
	print "2. Meekly"
	print "3. Haughtily"
	print "4. Offer a gift"
	choice = raw_input("> ")
	if choice == "2":
		leader.talkRespond('meek')
	elif (choice == "3"):
		leader.talkRespond('haughty')
	elif choice == "1":
		leader.talkRespond('polite')
	elif choice == "4":
		checkGift()
		chooseGift()
	elif choice == "exit":
		exit(0)
	else:
		print "Please choose a valid option."
		LeaderOptions()

def checkGift():
	if len(giftlist) < 1:
		print "You don't have any gifts to offer."
		LeaderOptions()
	else:
		pass

def giftListCheck():	
	if 'None' in giftlist:
		giftlist.remove('None')
	else:
		pass	
		
def leaderMeet():
	global leader
	global goodgifts
	if route == 'USA':
		leader = Obama(Leader)
		goodgifts = people.goodgifts1
	elif route == 'Korea':
		leader = Park(Leader)
		goodgifts = people.goodgifts2
	elif route == 'Russia':
		leader = Putin(Leader)
		goodgifts = people.goodgifts3
	elif route == 'Brazil':
		leader = Roussef(Leader)
		goodgifts = people.goodgifts4
	elif route == 'Germany':
		leader = Merkel(Leader)
		goodgifts = people.goodgifts5
	else:
		pass
		
def chooseGift():
	print "What would you like to give the leader?"
	#print "(He likes...", goodgifts, ".)"
	j = 1
	for gifts in giftlist:
		print j,".", gifts
		j += 1
	giftlist.insert(0, "None")
	try:
		gift = giftlist[(input("> "))]
		if gift in giftlist:
			print
			print "You present the leader with %s!" % gift
			leader.giftRespond(gift)
	except (IndexError, SyntaxError):
		print "Please choose a valid option."
		giftListCheck()
		j=0
		chooseGift()

#################

# Leader meeting results

def Success():
	print
	print "%s seems very impressed with you." % people.leaders[route]
	print "You receive a %s!\n" % people.gifts[route]
	giftlist.append(str(people.gifts[route]))
	goodgifts = []

	print "You signal the mothership to go to another region.\n"
	global i
	i = 1
	themap.drop_point.remove(route)
	if len(themap.drop_point) > 0:
		GameStart()
	else:
		Win()

def Jerk():
	print
	print "%s really doesn't care for your tone." % people.leaders[route]

def Doormat():
	print
	print "In this planet's vernacular, %s would say you're a bit a doormat." % people.leaders[route]
	print "You're not gaining any respect with this approach."
	print

def Failure():
	giftListCheck()
	print "You are dismissed before you can discuss your mission."
	print "You travel to another drop point to try again elsewhere.\n"
	GameStart()
	
def Win():
	print "Thanks to your diplomacy, the United Nations sends you home with a message,"
	print "inviting your species to Earth to join them. Nice job!"
	exit(0)
	
#################

#Actually pressing Play

GameStart()

