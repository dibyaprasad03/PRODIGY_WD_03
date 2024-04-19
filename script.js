const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (board[index] === '' && gameActive) {
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    if (checkForWin()) {
      status.innerText = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (checkForDraw()) {
      status.innerText = `It's a draw!`;
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.innerText = `Current player: ${currentPlayer}`;
    }
  }
}

function checkForWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

function checkForDraw() {
  return board.every(cell => {
    return cell !== '';
  });
}

function restartGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  cells.forEach(cell => {
    cell.innerText = '';
  });
  status.innerText = `Current player: ${currentPlayer}`;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);