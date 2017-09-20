var wordsList = ["empire", "rebellion", "star destroyer", "x wing", "tie fighter", "death star", "han solo", "skywalker", "princess", "stormtrooper", "blaster", "lightsaber"]; //12 words
var lenList = wordsList.length;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var alphArray = alphabet.split("");
var blast1 = new Audio('assets/sounds/blaster-solo.wav');
var blast2 = new Audio('assets/sounds/blaster-imp.wav');
var blast3 = new Audio('assets/sounds/blaster-ric.wav');
var blasts = [blast1, blast2, blast3];
var scream = new Audio('assets/sounds/scream.mp3');
var nooo = new Audio('assets/sounds/nooo.mp3');

//console.log(alphArray);
//console.log("the length of the words array is: " + lenList);
//console.log(blasts);

var score = 0;

function game() {
  //make all images with the class of trooper visible
  var lives = 6;
  var guessed = [];
  var word = wordsList[(Math.floor(Math.random() * lenList))];
  //console.log("the randomly selected word is " + word);

  var displayWord = [];
  for ( var i = 0; i<word.length; i++) {
    if (word[i] !== " ") {
      displayWord[i] = "_";
    }
    else {
      displayWord[i] = " ";
    }
  }
  console.log("the displayWord is " + displayWord);

  //rewrite the html span with displayWord

  alert("start guessing letters by pressing a key");

  document.onkeyup = function(event) {
    var letter = event.key;
    if(guessed.indexOf(letter) === -1) {
      blasts[(Math.floor(Math.random() * 3))].play();
      var loseLife = true;
      for (var i=0; i<word.length; i++) {
        if (letter === word[i]) {
          displayWord[i] = letter;
          loseLife = false;
        }
      }
      guessed.push(letter);
      console.log(displayWord);
      if (loseLife) {
        console.log("letters you have guessed: " + guessed);
        scream.play();
        //make trooper-(lives) hidden;
        lives--;
        console.log("Lives remaining: " + lives);
        if (lives === 0) {
          alert("You have failed to stop Darth Vader, but you may live to fight another day");
          game();
        }
      }
      console.log("Lives remaining: " + lives);
      if (displayWord.indexOf("_") === -1 ) { //This means there are no more hidden letters, and the player has won
        score ++;
        nooo.play();
        alert("You have stopped Darth Vader!! Good work Rogues!");
        game();
      }
    }
  }

}

game();