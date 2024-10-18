const X_CLASS = "x";
const O_CLASS = "o";
let currentPlayer = X_CLASS;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll("[data-cell]");
const clickSound = document.getElementById("click-sound");
const board = document.querySelector(".board");
const restartButton = document.getElementById("restartButton");
let gameActive = true;

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});
restartButton.addEventListener("click", function () {
  console.log("Restart button clicked!");
  restartGame();
});

function endGame(draw) {
  setTimeout(() => {
    if (draw) {
      alert("It's a draw!");
    } else {
      alert(`${currentPlayer === X_CLASS ? "Player" : "Computer"} wins!`);
    }
    gameActive = false;
  }, 100);
}

function placeMark(cell, currentPlayer) {
  if (currentPlayer === X_CLASS) {
    cell.textContent = "X";
    cell.classList.add(X_CLASS);
  } else {
    cell.textContent = "O";
    cell.classList.add(O_CLASS);
  }
}

function swapTurns() {
  currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

function handleClick(e) {
  if (!gameActive) return;

  const cell = e.target;

  if (cell.textContent !== "") {
    return;
  }

  placeMark(cell, currentPlayer);

  clickSound.play();

  setTimeout(() => {
    if (checkWin(currentPlayer)) {
      endGame(false);
      return;
    }
    if (isDraw()) {
      endGame(true);
      return;
    }

    swapTurns();

    setTimeout(computerMove, 500);
  }, 50);
}

function computerMove() {
  const availableCells = [...cells].filter((cell) => !cell.textContent);
  if (availableCells.length === 0) return;

  const randomCell =
    availableCells[Math.floor(Math.random() * availableCells.length)];
  placeMark(randomCell, O_CLASS);

  setTimeout(() => {
    if (checkWin(O_CLASS)) {
      endGame(false);
      return;
    }
    if (isDraw()) {
      endGame(true);
      return;
    }

    swapTurns();
  }, 50);
}

function checkWin(currentPlayer) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

function isDraw() {
  return [...cells].every(
    (cell) =>
      cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  );
}
function endGame(draw) {
  setTimeout(() => {
    if (draw) {
      alert("It's a draw!");
    } else {
      alert(`${currentPlayer === X_CLASS ? "Player" : "Computer"} wins!`);
    }
    gameActive = false;
  }, 100);
}
function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove(X_CLASS, O_CLASS);
  });

  currentPlayer = X_CLASS;
  gameActive = true;

  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
}
