const choices = ["rock","paper","scissors"];
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const resultText = document.getElementById("resultText");
const choiceButtons = document.querySelectorAll(".choice-btn");
const countdownEl = document.getElementById("countdown");
const playAgainBtn = document.getElementById("playAgainBtn");
const playerChoiceImg = document.getElementById("playerChoiceImg");
const computerChoiceImg = document.getElementById("computerChoiceImg");

let playerScore = 0, computerScore = 0, gameActive = true;

const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const drawSound = document.getElementById("drawSound");

function getComputerChoice() {
  return choices[Math.floor(Math.random()*choices.length)];
}

function showCountdown(callback) {
  let count=3;
  countdownEl.textContent=count;
  countdownEl.style.display="block";
  const iv = setInterval(()=>{
    count--;
    if(count<=0){
      clearInterval(iv);
      countdownEl.style.display="none";
      callback();
    } else countdownEl.textContent=count;
  },1000);
}

function checkWinner(player,cpu){
  if(player===cpu) return "draw";
  if((player==="rock"&&cpu==="scissors")||
     (player==="paper"&&cpu==="rock")||
     (player==="scissors"&&cpu==="paper"))
    return "player";
  return "computer";
}

function updateScore() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function showConfetti(){
  confetti({particleCount:100,spread:120,origin:{y:0.6}});
}

choiceButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(!gameActive)return;
    const playerChoice = btn.dataset.choice;
    showCountdown(()=>{
      const cpuChoice = getComputerChoice();
      const winner = checkWinner(playerChoice,cpuChoice);
      playerChoiceImg.src=`${playerChoice}.png`;
      computerChoiceImg.src=`${cpuChoice}.png`;
      if(winner==="draw"){ resultText.textContent="🤝 It's a draw!"; drawSound.play(); }
      else if(winner==="player"){ resultText.textContent="🎉 You win this round!"; winSound.play(); playerScore++; showConfetti();}
      else{ resultText.textContent="💻 Computer wins this round!"; loseSound.play(); computerScore++; }

      updateScore();

      if(playerScore===5||computerScore===5){
        gameActive=false;
        resultText.textContent = playerScore===5 ? "🎊 You won the game!" : "😢 Computer won the game!";
        playAgainBtn.style.display="block";
      }
    });
  });
});

playAgainBtn.addEventListener("click",()=>{
  playerScore=computerScore=0;
  gameActive=true;
  updateScore();
  resultText.textContent="";
  playerChoiceImg.src=computerChoiceImg.src="";
  playAgainBtn.style.display="none";
});
