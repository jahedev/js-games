/* #region Declare Elements */
const container = document.querySelector('.container');
const boxes = document.querySelectorAll('.tile');
const playAgain = document.querySelector('.btn');
const winner = document.querySelector('#winner');
/* #endregion */

/* #region Game Functions */

var isX = true;
function XO() {
  let XO = isX ? 'X' : 'O';
  isX = !isX;
  return XO;
}

function resetGame() {
  boxes.forEach((box) => {
    box.innerHTML = '';
    winner.innerHTML = '';
    isX = true;
  });
}
function showPlayAgain(shouldShow) {
  if (shouldShow) {
    playAgain.classList.add('visible');
  } else {
    playAgain.classList.remove('visible');
  }
}
function fillBox(boxNum, letter) {
  boxes[boxNum].innerText = letter;
}
function gameFinisher() {
  // check if all boxes are full
  allBoxesFull = true;
  boxes.forEach((box) => {
    if (box.innerText == '') allBoxesFull = false;
  });
  if (allBoxesFull) {
    showPlayAgain(true);
    return;
  }

  let gameWonBy = whoWon();

  if (gameWonBy === 'X' || gameWonBy === 'O') {
    winner.innerText = gameWonBy + ' won the game';
    showPlayAgain(true);
  }
}

function allEqual(arr) {
  return arr.every((val, i, arr) => val === arr[0]);
}

function whoWon() {
  let B = [];
  boxes.forEach((box) => {
    B.push(String(box.innerText));
  });
  // row 1, 2, and 3
  if (B[0] !== '' && allEqual(B.slice(0, 3))) return B[0];
  if (B[3] !== '' && allEqual(B.slice(3, 6))) return B[3];
  if (B[6] !== '' && allEqual(B.slice(6))) return B[6];

  // column 1, 2, and 3
  if (B[0] !== '' && allEqual([B[0], B[3], B[6]])) return B[0];
  if (B[1] !== '' && allEqual([B[1], B[4], B[7]])) return B[1];
  if (B[2] !== '' && allEqual([B[2], B[5], B[8]])) return B[2];

  // diagnols
  if (B[0] !== '' && allEqual([B[0], B[4], B[8]])) return B[0];
  if (B[2] !== '' && allEqual([B[2], B[4], B[6]])) return B[2];

  return '';
}

/* #endregion */

/* #region Event Listeners */
container.addEventListener('click', (e) => {
  if (e.target.classList == 'tile') {
    if (e.target.innerText == '') {
      if (winner.innerText == '') e.target.innerText = XO();
    }
  }
  gameFinisher();
});
playAgain.addEventListener('click', (e) => {
  showPlayAgain(false);
  resetGame();
});
/* #endregion */
