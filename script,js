// script.js
const choices = document.querySelectorAll('.choice');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const resultText = document.getElementById('resultText');
const playAgainBtn = document.getElementById('playAgainBtn');
const countdownEl = document.getElementById('countdown');

const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const drawSound = document.getElementById('drawSound');

let playerScore = 0;
let computerScore = 0;
let isGameOver = false;

const startCountdown = (callback) => {
  let count = 3;
  countdownEl.textContent = count;
  countdownEl.classList.remove('hidden');

  const interval = setInterval(() => {
    count--;
    countdownEl.textContent = count;
    if (count === 0) {
      clearInterval(interval);
      countdownEl.textContent = '';
      countdownEl.classList.add('hidden');
      callback();
    }
  }, 1000);
};

const getComputerChoice = () => {
  const options = ['rock', 'paper', 'scissors'];
  return options[Math.floor(Math.random() * options.length)];
};

const determineWinner = (player, computer) => {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'scissors' && computer === 'paper') ||
    (player === 'paper' && computer === 'rock')
  ) {
    return 'player';
  }
  return 'computer';
};

const showConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 120,
    origin: { y: 0.6 },
  });
};

const updateScore = (winner) => {
  if (winner === 'player') {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    resultText.textContent = '🎉 You Win This Round!';
    winSound.play();
    showConfetti();
  } else if (winner === 'computer') {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    resultText.textContent = '💻 Computer Wins This Round!';
    loseSound.play();
  } else {
    resultText.textContent = "🤝 It's a Draw!";
    drawSound.play();
  }

  if (playerScore === 5 || computerScore === 5) {
    endGame();
  }
};

const endGame = () => {
  isGameOver = true;
  resultText.textContent += playerScore === 5 ? ' 🎊 You Won the Game!' : ' 😓 Computer Won the Game!';
  playAgainBtn.classList.remove('hidden');
  choices.forEach(btn => btn.disabled = true);
};

const resetGame = () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;
  resultText.textContent = '';
  isGameOver = false;
  playAgainBtn.classList.add('hidden');
  choices.forEach(btn => btn.disabled = false);
};

choices.forEach(btn => {
  btn.addEventListener('click', () => {
    if (isGameOver) return;

    const playerChoice = btn.id;

    startCountdown(() => {
      const computerChoice = getComputerChoice();
      const winner = determineWinner(playerChoice, computerChoice);
      updateScore(winner);
    });
  });
});

playAgainBtn.addEventListener('click', resetGame);
