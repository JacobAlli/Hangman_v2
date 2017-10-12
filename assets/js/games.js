
//create words array
var words = ["cat", "dog", "bird", "human", "bleh", "hang", "booyah", "hola"];

//create randomWord variable that a setup function can store to
var randomWord;

//create wordBlanks array
var wordBlanks = [];


var newDiv;

var userGuess;

var alreadyGuessed = [];

var guessesLeft = 7;

var wins = 0;
var losses = 0;

var playGameState = true;

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var newRandomWord = function(){
    randomWord = words[Math.floor(Math.random() * words.length)];
};

var setup = function(){

    newRandomWord();

    for(i = 0; i < randomWord.length; i++){
        wordBlanks.push("_ ");
    }

    $("#wordBlanks").html(wordBlanks);
    $("#wrongGuesses").html("Wrong Guesses: " + alreadyGuessed.join(" | "));
    $("#guessesLeft").html("Guesses left: " + guessesLeft);
    $("#wins").html("Wins: " + wins);
    $("#losses").html("Losses: " + losses)
};

var replaceBlanks = function(){

    $(".alphabetBtns").on("click", function(){

        userGuess = this.value;
        console.log(this.value);

        for(i = 0; i < randomWord.length; i++){
            if(userGuess === randomWord[i]){
                wordBlanks[i] = userGuess;
                $("#wordBlanks").html(wordBlanks);
            }
        };

        if(! randomWord.includes(userGuess) && guessesLeft > 0){
            if(! alreadyGuessed.includes(userGuess)){
                alreadyGuessed.push(userGuess);
                $("#wrongGuesses").html("Wrong Guesses: " + alreadyGuessed.join(" | "));
                guessesLeft--;
                $("#guessesLeft").html("Guesses left: " + guessesLeft);
            }
        }

    });
};

var reset = function(){
    wordBlanks = [];
    alreadyGuessed = [];
    guessesLeft = 7;
    setup();
    $("#wrongGuesses").html("Wrong Guesses: " + alreadyGuessed.join(" | "));
    $("#guessesLeft").html("Guesses left: " + guessesLeft);
};

var gameResult = function(){
    setInterval(function(){
        if(guessesLeft === 0){
            alert("You lose");
            losses++;
            reset();
        }
        else if($("#wordBlanks")[0].innerHTML === randomWord){
            alert("You win");
            wins++;
            reset();
        }
    }, 500);
};

var createButtons = function(){
    for(i = 0; i < alphabet.length; i++){
        newDiv = $("<button>");
        newDiv.addClass("alphabetBtns");
        newDiv.html(alphabet[i]);
        newDiv.attr("value", alphabet[i]);
        $("#alphabetButtons").append(newDiv);
    }

};

$(document).ready(function(){

    setup();
    createButtons();
    replaceBlanks();
    gameResult();
});




