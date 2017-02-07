# 5 March 2016. A basic tip calculator.
import sys
import random

z = random.randint(10,50)
bill = float(z)
tip = (bill * 0.15)
total = bill + tip

print "\nYour bill is %s." % (bill)
print "You tip fifteen percent, or %s." % (tip)
print "The server runs your card for %s." % (total)

#Four minutes to write it "close enough", and 20 minutes to fight 
#with decimals. (sigh) Still didn't get it right.