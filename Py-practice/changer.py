#5 March 2015.  Making change from a random transaction, down to the last penny.

import sys
import random
from decimal import *

getcontext().perc = 2

cents = Decimal(random.randint(0, 100))
dollars = Decimal(random.randint(0,100))
cost = dollars + (cents/100)

print "\nYour bill is %.2f." % cost
print "How much cash do you give the clerk?"
payment = input("\n> \n")

change = (Decimal(payment)-Decimal(cost))
if change < 0:
	print "You still owe the cashier $%s. Better check your pockets!" % abs(change)
	exit(0)
else:
	print "The cashier gives you $%s in change." % abs(change)
	
#Basic change calculation program completed in 30 min.  
#Learned about Decimal module and decimal vs float notation.

twenties = (change/20)
fives = ((change - twenties)/5)
ones = change % 5

change = change - int(change)

print "The cashier hands you the following change:\n"
print "%i Twenties" % twenties
print "%i Fives" % fives
print "%i Ones\n" % ones

#Decimals are a paaaaain.
#After 20 minutes of struggling, it dawned on me to convert the decimal to an integer...
#After more fiddling with rounding, I realized I was making the change calculations 
#waaay more complicated than they needed to be.

coins = change * 100

quarters = (coins/25)
coins = coins % 25

dimes = (coins/10)
coins = coins % 10

nickels = coins/5
coins = coins % 5

pennies = coins

print "%i quarters" % quarters
print "%i dimes" % dimes
print "%i nickels" % nickels
print "%i pennies" % pennies


#That took way too long for such a simple program.
#At least I know how to use the modulus function now.
