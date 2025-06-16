const choices = ["rock", "paper", "scissors"];
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const resultMessage = document.getElementById("resultMessage");
const countdownEl = document.getElementById("countdown");
const choiceButtons = document.querySelectorAll(".choice");
const resetBtn = document.getElementById("resetBtn");
const playerChoiceImg = document.getElementById("playerChoiceImg");
const computerChoiceImg = document.getElementById("computerChoiceImg");
const computerChoiceText = document.getElementById("computerChoice");

const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const drawSound = document.getElementById("drawSound");

let playerScore = 0;
let computerScore = 0;
let gameActive = true;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function showCountdown(callback) {
  let count = 3;
  countdownEl.textContent = `Choose in: ${count}`;
  const interval = setInterval(() => {
    count--;
    countdownEl.textContent = `Choose in: ${count}`;
    if (count === 0) {
      clearInterval(interval);
      callback();
    }
  }, 1000);
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
  computerChoiceText.textContent = `Computer chose: ${computerChoice}`;

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
    resultMessage.textContent = playerScore === 5 ? "🎊 You won the game!" : "😢 Computer won!";
    confetti();
    resetBtn.style.display = "block";
  }
}

function updateScores() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!gameActive) return;
    const playerChoice = button.dataset.choice;
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
  playerChoiceImg.src = "";
  computerChoiceImg.src = "";
  resultMessage.textContent = "";
  computerChoiceText.textContent = "";
  resetBtn.style.display = "none";
  updateScores();
});
