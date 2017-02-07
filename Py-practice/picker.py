# Jenni Corbus, 1 March 2016. Exercise picker with sample tasks for programming practice.

import sys
import random 

t1 = "Write a function that tests whether a string is a palindrome."
t2 = "Write a program that accepts a name input, greets Jenni and Ruby, and gives an 'access denied' message to anyone else."
t3 = "Write a program that rings up a purchase, accepts payment, and counts out change in exact denominations."
t4 = "Write a rudimentary blackjack program."
t5 = """Write a program that prints the numbers from 1 through 100. For multiples of three print 'Fizz' instead of the number and for the multiples of five print 'Buzz'. For numbers which are multiples of both three and five print 'FizzBuzz'."""
t6 = "Write a program that asks the user for a number n and gives the options of computing the sum and computing the product of 1 to n."
t7 = "Write a function that takes a number and returns a list of its digits."

tasklist = [
  t1, t2, t3, t4, t5, t6, t7 #...
]

r = random.randint(0, len(tasklist)-1)

def picker():
	print "\n\nHere is your assignment:\n"
	task = tasklist[r]
	print task, "\n\n"

picker()
