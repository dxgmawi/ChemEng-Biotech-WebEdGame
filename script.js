document.addEventListener("keydown", function () {
  startGame();
});

function startGame() {
  const msg = document.getElementById("start-msg");
  msg.textContent = "Starting game...";
  msg.classList.remove("blink");
}
