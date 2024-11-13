


$(document).ready(function() {
    var wordsOfTheGame = [
      { word: "tiger", description: "A large cat known for its stripes." },
      { word: "pizza", description: "A popular Italian dish with cheese and tomato sauce." },
      { word: "green", description: "The color of grass and leaves." },
      { word: "ocean", description: "Large body of saltwater that covers much of Earth." },
      { word: "mouse", description: "A small device used to control the cursor on a computer." },
      { word: "planet", description: "A large object that orbits a star." },
      { word: "train", description: "A vehicle that runs on tracks." },
      { word: "happy", description: "A feeling of joy or contentment." },
      { word: "guitar", description: "A string instrument played with fingers or a pick." },
      { word: "cactus", description: " A plant that grows in the desert." },
      { word: "egypt", description: "Known for its ancient pyramids." }
    ];
  
    var chosenWord = {};
    var guessedLetters = [];
    var wrongGuesses = [];
    var maxAttempts = 5;
    var score = 0;
  $("#enter").click(function(){
    window.open('http://127.0.0.1:5500/Game.html','_blank');
 })

  
    function start() {
        chosenWord = wordsOfTheGame[Math.floor(Math.random() * wordsOfTheGame.length)]; //take one of the words randomly
        guessedLetters = [];
        wrongGuesses = [];
        updateDisplay();
        ChangeBar();
        $("#description-text").text(chosenWord.description); //give u the description of chosen word
        $("#message").text("");
        $("#the-input").val(""); //réinitial value of input
        $("#score").text("Score: " + score); // display score
        $("#game-image").attr("src", "images/1.jpg"); // set the initial image
        
    }
    
function updateDisplay() {
    var word = chosenWord.word;
    var display = "";
    for (var i = 0; i < word.length; i++) {
        if (guessedLetters.includes(word[i])) {
            display += word[i] + " ";
        } else {
            display += "_ ";
        }
    }

    // trim to delete espaces
    $("#word-display").text(display.trim());
}

  
    // create bordure with alphabet; every letter in span (espace) and change color of their background with answer
    function ChangeBar() {
        var alphabe = "abcdefghijklmnopqrstuvwxyz";
        $("#letter-bar").empty();
        var i = 0;
        while (i < alphabe.length) {
            var letterButton = $("<span>").text(alphabe[i]).addClass("letter-btn");
    
            // Check if the letter putted is wrong and change backgroud
            if (wrongGuesses.includes(alphabe[i])) {
                letterButton.addClass("crossed-out"); 
            }
    
            // Check if the letter putted is right and change backgroud
            if (guessedLetters.includes(alphabe[i])) {
                letterButton.css("background-color", "green");
            }
    // add  the letterButton element  inside #letter-bar 
            $("#letter-bar").append(letterButton);
            i++;
        }
    }
  
    function Guessess() {
        var guess = $("#the-input").val().toLowerCase();// make guess to low cases
        $("#the-input").val("");
    // if guess empty or you enter the same guess that u enter before
        if (!guess || guessedLetters.includes(guess) || wrongGuesses.includes(guess)) {
            $("#message").text("Invalid or repeated guess!");
            return;
        }
    
        if (chosenWord.word.includes(guess)) {
            guessedLetters.push(guess);
            $("#message").text("Correct guess!");
        } else {
            wrongGuesses.push(guess);
            $("#message").text("Wrong guess! Attempts left: " + (maxAttempts - wrongGuesses.length));
        }
    
        updateDisplay();
        ChangeBar();
        updatImage(); // a new image when fail
        
        winOrLose();
    }
    
  
    // Check if the game is won or lost
    function winOrLose() {
        var allGuessed = true;
    
        // Check if every letter in the chosen word has been guessed
        for (var i = 0; i < chosenWord.word.length; i++) {
            var letter = chosenWord.word[i];
    
            // If a letter is not guessed, mark  as false and out
            if (!guessedLetters.includes(letter)) {
                allGuessed = false;
                break;
            }
        }
     // if all good increase score and start a new game after 5 s
        if (allGuessed) {
            score += 10;
            $("#message").text("You won! Starting a new word...");
            setTimeout(start, 5000);
        } else if (wrongGuesses.length >= maxAttempts) {
            // if loose, decrease score and start a new game after 5 s
            $("#message").text("You lost! The word was: " + chosenWord.word);
            score -= 5;
            setTimeout(start, 5000);
        }
        $("#score").text("Score: " + score);
    }
  
    $("#guess-btn").on("click", Guessess);
    $("#new-game-btn").on("click", start);

    function updatImage() {
        let allGuessed = true;
    
        // Check if all letters in the chosen word have been guessed
        for (var i = 0; i < chosenWord.word.length; i++) {
            var letter = chosenWord.word[i];
            if (!guessedLetters.includes(letter)) {
                allGuessed = false;
                break;
            }
        }
    // attribute new sources to image when condition met
        if (wrongGuesses.length >= maxAttempts) {
            $("#game-image").attr("src", "images/dead.jpg");
        } else if (allGuessed) {
            $("#game-image").attr("src", "images/win.jpg");
        } else {
            $("#game-image").attr("src", "images/" + (wrongGuesses.length + 1) + ".jpg");
        }
    }
    



  
  });