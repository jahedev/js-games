/* #region Declare Elements */
const container = document.querySelector('.container');
const boxes = document.querySelectorAll('.tile');
const playAgain = document.querySelector('.btn');
/* #endregion */

/* #region Declare Elements */
var isX = true;
function XO() {
  let XO = isX ? 'X' : 'O';
  isX = !isX;
  return XO;
}

/* #endregion */

/* #region Game Functions */

function resetGame() {
  boxes.forEach((box) => {
    box.innerHTML = '';
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

  let gameWonBy = gameWonBy();
  if (gameWonBy() === 'X') {
  } else if (gameWonBy() === 'O') {
  }
}

function allEqual(arr) {
  return arr.every((val, i, arr) => val === arr[0]);
}

function gameWonBy() {
  const B = [];
  boxes.forEach((box) => {
    B.push(String(box.innerText));
  });
  // row 1, 2, and 3
  if (B[0] !== '' && allEqual(B.slice(0, 3))) return B[0];
  if (B[3] !== '' && allEqual(B.slice(3, 6))) return B[0];
  if (B[6] !== '' && allEqual(B.slice(6))) return B[0];
}

/* #endregion */

/* #region Event Listeners */
container.addEventListener('click', (e) => {
  if (e.target.classList == 'tile') {
    if (e.target.innerText == '') {
      e.target.innerText = XO();
    }
  }
  gameFinisher();
});
playAgain.addEventListener('click', (e) => {
  showPlayAgain(false);
  resetGame();
});
/* #endregion */
