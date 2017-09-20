# Hangman-Game
Star Wars Themed



Javascript:

create an array of words, star wars related
create an array of the letters in the alphabet

set score to 0

start/restart from HERE

make all troopers visible (to represent the player having six "lives"), reset lives, or guesses to 6;

randomly choose a word from the words array and store this in a new variable

create an array with the same number of elements as the chosen word, with all indexes having a value of "underscore"

Alert the user to start guessing letters by pressing a key

While lives is greater than zero, execute the following ---
Set variable and an event listener to store the letter of the pressed key
play the blaster sound bite when the key is pressed.

for playing sounds: 
var audio = new Audio('audio_file.mp3');
audio.play();

check to see if the guessed letter is in the string of the chosen word
if so, report it's location(s)

change the underscores in the displayed array at the reported location(s) to the letter in the chosen word at the reported locations(s)

if not, play the wilhelm scream sound, hide a rebel trooper (with the id that corresponds to the number of guesses remainging), and THEN decrement guesses (life).

if that was the last trooper and there are no more guesses left, display an alert that the player has failed to stop Darth Vader, but they will have another chance, and then restart from the restart point, aka call the game function again.

if there are no underscores remaining in the displayed array for the word, then the word is solved, the score goes up by 1, and then restart.
---