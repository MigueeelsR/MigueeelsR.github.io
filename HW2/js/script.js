// Event listeners
document.querySelector("#playBtn").addEventListener("click", playGame);
document.querySelector("#resetBtn").addEventListener("click", resetGame);

let balance = 1000;
let randomIndex;
let symbols = ["cherry.jpeg", "bar.jpeg", "seven.jpeg"];
let slotImages = [
    document.querySelector("#slot1"),
    document.querySelector("#slot2"),
    document.querySelector("#slot3")
];
let resultText = document.querySelector("#result");
let balanceText = document.querySelector("#balance");
let playBtn = document.querySelector("#playBtn");
let bet;
document.querySelector("#resetBtn").style.display = "none";

function playGame() {
    bet = parseInt(document.querySelector("#number").value);
    if (bet <= 0) {
        resultText.textContent = "Enter a valid amount!";
        resultText.style.color = "red";
        return;
    }
    if (bet > balance) {
        resultText.textContent = "Not enough balance!";
        resultText.style.color = "red";
    }
    // Slot spins
    let results = [];
    for (let i = 0; i < 3; i++) {
        randomIndex = Math.floor(Math.random() * symbols.length);
        results.push(symbols[randomIndex]);
        slotImages[i].src = "img/" + symbols[randomIndex];
    }
    // Win conditions
    if (results[0] == results[1] && results[1] == results[2]) {
        let winnings = bet * 4;
        balance += winnings;
        resultText.textContent = "Jackpot! You won: $" + winnings;
        resultText.style.color = "green";
    } else {
        balance -= bet;
        resultText.textContent = "You lost: $" + bet;
        resultText.style.color = "orange";
    }

    document.querySelector("#balance").textContent = "Balance: $" + balance;

    if (balance <= 0) {
        playBtn.style.display = "none";
        resetBtn.style.display = "inline";
        resultText.textContent = "Game Over! Click reset to restart";
        resultText.style.color = "red";
    }
}
function resetGame() {
    balance = 1000;
    playBtn.style.display = "inline";
    resetBtn.style.display = "none";
    balanceText.textContent = "Balance: $" + balance;
    resultText.textContent = "Game reset!";
    resultText.style.color = "blue";
}