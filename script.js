// script.js - Updated Rock Paper Scissors Game Logic

const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let gameActive = true;

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const resultText = document.getElementById("resultText");
const computerChoiceEl = document.getElementById("computerChoice");
const countdownEl = document.getElementById("countdown");
const playAgainBtn = document.getElementById("playAgainBtn");
const choiceButtons = document.querySelectorAll(".choice");

const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const drawSound = document.getElementById("drawSound");

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
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
  ) return "player";
  return "computer";
}

function displayResult(winner, playerChoice, computerChoice) {
  computerChoiceEl.textContent = `Computer chose: ${computerChoice}`;

  if (winner === "draw") {
    resultText.textContent = "🤝 It's a draw!";
    drawSound.play();
  } else if (winner === "player") {
    resultText.textContent = "🎉 You win this round!";
    winSound.play();
    playerScore++;
  } else {
    resultText.textContent = "💻 Computer wins this round!";
    loseSound.play();
    computerScore++;
  }

  updateScores();

  if (playerScore === 5 || computerScore === 5) {
    gameActive = false;
    resultText.textContent = playerScore === 5 ? "🎊 You won the game!" : "😢 Computer won the game!";
    playAgainBtn.classList.remove("hidden");
    triggerConfetti();
  }
}

function showCountdown(callback) {
  let count = 3;
  countdownEl.textContent = `Choose in: ${count}`;
  countdownEl.style.display = "block";

  const interval = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(interval);
      countdownEl.style.display = "none";
      callback();
    } else {
      countdownEl.textContent = `Choose in: ${count}`;
    }
  }, 1000);
}

function triggerConfetti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { x: 0.1, y: 0.6 },
  });
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { x: 0.9, y: 0.6 },
  });
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

playAgainBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  gameActive = true;
  resultText.textContent = "";
  computerChoiceEl.textContent = "";
  playAgainBtn.classList.add("hidden");
  updateScores();
});
