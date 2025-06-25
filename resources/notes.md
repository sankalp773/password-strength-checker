## Research Paper 1: Measuring Password Strength :An empirical Analysis
### Introduction
-    To defend against intruders who repeatedly try password after password to obtain access ,usually the best way is making it costly for them to do it, because the bigger the search space is more resources he will need, so increasing the search space makes it unfeasable for repeated tries.
-   Password strength is measured in this paper against state of art techniques like free password recovery software John the Ripper.It uses large dictionary with some mamngling rules such as appending prepending digits to dictionary words.
-   proactive password checking: the impact of password checkers is debatable as usually users find a way to bypass the requirements by adding one or two digits or characters, which are easy to guess. 
- a proactive password checker should use the search space size as the measure of strength.

### Dataset 
- Unencrypted passwords of 9,317 registered users of an Italian instant messaging service.
- no strength enforcement was done on these passwords
- 2.89% of users used their usrrnames as their passwords.
- The average password length is 7.86
- one cahracter out of 11 is an 'a'
- while 'A' has a frequency of 1 in 500
- more than 50% of  passwords contain only lowercase.
- less than 9% of passwords conatain non-alphanumeric characters.

### Dictionary Attack
- John the ripper maintains a large sized dictionary , containing words from 21  different human languages. 
- all dictionaries it uses contains about 4 million words.
- add to that a little bit of mangling and you get a dictionary of 40 million words.
-  other than dictionaries common phrases converted into passwords should also be checked against.

### Experimental Results
- memorable phrases and music lyrics are also easy to crack.
- common misspellings (e.g msg for message ) are also present in the dictionary words and hence easy to guess.
- It might be a good practice to use native language to create strong passwords.


### Markov Chain-based Atack
- This model represents a password choice as a sequence of random events: 
    * First , length of the password is chosen according to a given probability distribution
    * Second ,each character of the string gets extracted according to a conditional probabilty depending on the previous k-1 characters.
- We encode characterstics of password using two functions $\lambda$ and $\nu$.
    $\lambda$(8) is the probability that the password has 8 length.
    $\nu$(c1....ck|c1....ck-1) is the probabilty that the character ck follows substring c1...ck-1. for k=1, $\nu$(c) expresses frequency of c, that is , the probabilty that a random character in our password coincides with c.   
