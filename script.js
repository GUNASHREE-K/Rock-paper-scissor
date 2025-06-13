// script.js

const choices = ["rock", "paper", "scissors"];
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const resultMessage = document.getElementById("resultMessage");
const choiceButtons = document.querySelectorAll(".choice-btn");
const countdownEl = document.getElementById("countdown");
const resetBtn = document.getElementById("resetBtn");
const playerChoiceImg = document.getElementById("playerChoice");
const computerChoiceImg = document.getElementById("computerChoice");

let playerScore = 0;
let computerScore = 0;
let gameActive = true;

const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");
const drawSound = new Audio("draw.mp3");

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function showCountdown(callback) {
  let count = 3;
  countdownEl.textContent = count;
  countdownEl.classList.add("show");

  const interval = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(interval);
      countdownEl.classList.remove("show");
      callback();
    } else {
      countdownEl.textContent = count;
    }
  }, 1000);
}

function updateScores() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function checkWinner(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  }
  return "computer";
}

function displayResult(winner, playerChoice, computerChoice) {
  playerChoiceImg.src = `${playerChoice}.png`;
  computerChoiceImg.src = `${computerChoice}.png`;

  if (winner === "draw") {
    resultMessage.textContent = "🤝 It's a draw!";
    drawSound.play();
  } else if (winner === "player") {
    resultMessage.textContent = "🎉 You win this round!";
    winSound.play();
    playerScore++;
  } else {
    resultMessage.textContent = "💻 Computer wins this round!";
    loseSound.play();
    computerScore++;
  }

  updateScores();

  if (playerScore === 5 || computerScore === 5) {
    gameActive = false;
    resultMessage.textContent = playerScore === 5 ? "🎊 You won the game!" : "😢 Computer won the game!";
    resetBtn.style.display = "block";
  }
}

choiceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!gameActive) return;

    const playerChoice = btn.dataset.choice;
    showCountdown(() => {
      const computerChoice = getComputerChoice();
      const winner = checkWinner(playerChoice, computerChoice);
      displayResult(winner, playerChoice, computerChoice);
    });
  });
});

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  gameActive = true;
  resultMessage.textContent = "";
  playerChoiceImg.src = "";
  computerChoiceImg.src = "";
  resetBtn.style.display = "none";
  updateScores();
});
