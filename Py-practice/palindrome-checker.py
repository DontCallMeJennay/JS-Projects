# 6 March 2016. Checks string to see if palindrome.

import sys

word = raw_input("Enter a string:  ")
letters = list(word)
rletters = []

for items in letters:
	rletters.append(items)
rletters.reverse()

print letters
print rletters

if letters == rletters:
	print "This is a palindrome."
else:
	print "This is not a palindrome."
	
#Completed in 9 minutes.