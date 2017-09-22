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
var deflect = new Audio('assets/sounds/saber-deflect.wav');
var breathing = new Audio('assets/sounds/breathing.mp3');
var darkSide = new Audio('assets/sounds/darkside.mp3');
var comeBack = new Audio ('assets/sounds/vader01.mp3');
var impMarch = new Audio ('assets/sounds/imperial_march.mp3');
var vaderEffects = [breathing, darkSide, comeBack];
var loseLife; //need this declared out here....or else it doesn't get changed locally;

function playBlasts() {
  blasts[(Math.floor(Math.random() * 3))].play();
}

function playVaderEffects() {
  vaderEffects[(Math.floor(Math.random() * 3))].play();
}

function playScream() {
  scream.play();
}

function playDeflect() {
  deflect.play();
}

function playDarkSide() {
  darkSide.play();
}

function removeTrooper(lives) {
  switch (lives) {
    case 6:
      document.getElementById("trooper-6").style.visibility = "hidden";
      break;
    case 5:
      document.getElementById("trooper-5").style.visibility = "hidden";
      break;
    case 4:
      document.getElementById("trooper-4").style.visibility = "hidden";
      break;
    case 3:
      document.getElementById("trooper-3").style.visibility = "hidden";
      break;
    case 2:
      document.getElementById("trooper-2").style.visibility = "hidden";
      break;
    case 1:
      document.getElementById("trooper-1").style.visibility = "hidden";

  }
}

function resetTroopers() {
  var x = document.getElementsByClassName(".trooper");
  for (var i=0; i < x.length; i++) {
    x[i].style.visibility = "visible";
  }
}

function updateDisWord(modWord, currentDisplayWord, letterIn, checkCounter) {
  var newDisplayWord = "";
  for (var i=0; i<modWord.length; i++) {
    if (letterIn === modWord[i]) {
      newDisplayWord += letterIn; 
      loseLife = false;
      console.log("the position is " + i);
      console.log("the letter at this position is " + modWord[i]);
    }
    else {
      newDisplayWord += currentDisplayWord[i];
    }
  }
  checkCounter++;
  console.log({checkCounter});
  console.log({newDisplayWord});
  console.log({loseLife});   
  return newDisplayWord;
}

var score = 0;

function game() {
  impMarch.pause();
  impMarch.currentTime = 0;
  breathing.play();
  setTimeout(playDarkSide, 4200);
  var lives = 6;
  var guessed = [];
  document.querySelector("#guesses").innerHTML = guessed;
  var word = wordsList[(Math.floor(Math.random() * lenList))];
  console.log("the randomly selected word is " + word);
  document.querySelector("#alert").innerHTML = ("May the Force be with you, Rogues");
  resetTroopers();

  var modifiedWord = "";
  for (var i=0; i<word.length; i++) {
    if (word[i] !== " ") {
      modifiedWord += (word[i] + " ");
    }
    else {
      modifiedWord += ("  ");
    }
  }
  console.log({modifiedWord});
  var displayWord = "";
  for (var i=0; i<modifiedWord.length; i++) {
    if (modifiedWord[i] !== " ") {
      displayWord += ("_");
    }
    else {
      displayWord += (" ");
    }
  }
  document.querySelector("#displayCode").innerHTML = displayWord; //rewrite the html span with displayWord
  console.log({displayWord});
  

  document.onkeyup = function(event) {
    var letter = event.key;
    console.log({letter});

    
    if(guessed.indexOf(letter) === -1 && alphArray.indexOf(letter) !== -1) {
      playBlasts();
      loseLife = true; //starts off true, and will be changed to false if the letter is found in the word
      
      // for (var i=0; i<modifiedWord.length; i++) {
      //   if (letter === modifiedWord[i]) {
      //     displayWord.charAt(i) = letter; //for some reason, this is not happening.
      //     loseLife = false;
      //     console.log("the position is " + i);
      //     console.log("the letter at this position is " + modifiedWord[i]);
      //   }
      // }
      var check = 0;
      displayWord = updateDisWord(modifiedWord, displayWord, letter, loseLife, check);
      console.log({loseLife});
      console.log({check});

      // var upDateWord = ""; //currently working block of code that I'm trying to replace with a function
      // for (var i=0; i<modifiedWord.length; i++) {
      //   if (letter === modifiedWord[i]) {
      //   upDateWord += letter; //for some reason, this is not happening.
      //   loseLife = false;
      //   console.log("the position is " + i);
      //   console.log("the letter at this position is " + modifiedWord[i]);
      //   }
      //   else {
      //     upDateWord += displayWord[i];
      //   }
      // }
      // displayWord = upDateWord; 

      guessed.push(letter); //adds the guessed letter to the array
      document.querySelector("#displayCode").innerHTML = displayWord;
      console.log(displayWord);

      document.querySelector("#guesses").innerHTML = guessed;
      console.log("letters you have guessed: " + guessed);

      if (loseLife) { //if the player guessed incorrectly, loseLife is still true
        
        setTimeout(playDeflect, 500);
        setTimeout(playScream, 1500);
        //playScream();
        setTimeout(removeTrooper, 1700, lives);//make trooper-(lives) hidden;
        setTimeout(playVaderEffects, 2000);
        lives--;
        console.log("Lives remaining: " + lives);
        document.querySelector("#displayLives").innerHTML = String(lives);
        
        if (lives === 0) {
          impMarch.play();
          document.querySelector("#alert").innerHTML = ("You have failed to stop Darth Vader, but you may live to fight another day. Press any key to try again");
          //alert("You have failed to stop Darth Vader, but you may live to fight another day");
          document.onkeyup = function(event){
            game();
          }
        }
      }
      else 
        {console.log("Lives remaining: " + lives);}
      if (displayWord.indexOf("_") === -1 ) { //This means there are no more hidden letters, and the player has won
        score ++;
        document.querySelector("#displayScore").innerHTML = score;
        nooo.play();
        document.querySelector("#alert").innerHTML = ("You have stopped Darth Vader!! Good work Rogues! Press any key for your next mission!");
        //alert("You have stopped Darth Vader!! Good work Rogues!");
        document.onkeyup = function(event){
          game();
        }
      }
    }
  }
}



game();