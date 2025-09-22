//Event listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);


//Global variables
let randomNumber;
let attempts = 0;
let attemptsLeft = 7;
let attemptsDiv = document.querySelector("#attemptsLeft");
let gamesWon = 0;
let gamesLost = 0;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);

    //hiding the reset button
    document.querySelector("#resetBtn").style.display = "none";

    //showing the guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus() //adding focus to textbox
    playerGuess.value = ""; //clearing the textbox
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";  //clearing feedabck message
    document.querySelector("#guesses").textContent = "";

}

function checkGuess() {
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    if(guess < 1 || guess > 99) {
        feedback.textContent = "Please enter a value between 1 and 99!";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";

    if(guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkgreen";
        gameOver();
        gamesWon++;
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if(attempts == 7) {
            feedback.textContent = "Sorry you lost!";
            feedback.style.color = "red";
            feedback.textContent = "The correct answer is: " + randomNumber;
            gameOver();
            //resetGame();
            gamesLost++;
        } else if(guess > randomNumber) {
            feedback.textContent = "Guess too high!"
            attemptsLeft--;
        } else {
            feedback.textContent = "Guess too low!"
            attemptsLeft--;
        }
    }
    if (attempts <= 7){
        attemptsDiv.textContent = attemptsLeft;
    }
}

function gameOver() {
    guessBtn = document.querySelector("#guessBtn");
    resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";    //hides guess button
    resetBtn.style.display = "inline";  //shows reset button
    //resetGame();
    attemptsLeft = 7;
}

function resetGame() {
    attemptsLeft = 7;
    randomNumber = Math.floor(Math.random() * 99) + 1;
    feedback.textContent = "";
    guesses.textContent = "";    
}