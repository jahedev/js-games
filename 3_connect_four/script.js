const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const imgBoard = document.getElementById('board')

// Set Canvas Dimensions to Board Image Size
canvas.width = 640
canvas.height = 480

// Player 1 is red by default
let player1Turn = true

// These are the colors of the checkers
const COLORS = {
  RED: '#D4252E',
  YELLOW: '#F1DE00',
}

// drawing X (col) and Y (row) coordinates of the checkers
let loc_col = [50, 140, 230, 320, 410, 500, 590] // n += 90
let loc_row = [40, 120, 200, 280, 360, 440] // n += 80

// store the empty, red, and yellow checkers
grid = [
  /* grid[row][col] */
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
]

class Board {
  draw() {
    c.drawImage(imgBoard, 0, 0)
  }
}

class Checker {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }
}

const board = new Board(0, 0)
board.draw()

/*
 * player1 = red
 * player2 = yellow
 * Then, change current player's turn and return the color
 */
function currPlayerColor() {
  let color = player1Turn ? 'red' : 'yellow'
  player1Turn = !player1Turn
  return color
}

/* Puts the chekers in to the specified column and returns true.
 * If there is another checkers below, it will be placed on top.
 * If there is no space left to fill, it will return false.
 */
function insertChecker(col) {
  if (isNaN(col) || col < 0 || col > 7) return false

  let emptyRow = -1
  for (let row = 0; row < 6; row++) {
    // get the lowest empty row
    if (grid[row][col] === undefined) emptyRow = row
  }

  // no rows are empty
  if (emptyRow === -1) return false

  // add checkers to that row
  grid[emptyRow][col] = currPlayerColor()
}

canvas.addEventListener('click', (e) => {
  const clickX = e.layerX // where user click on canvas/board
  const splitWidth = canvas.width / 7 // split canvas into 7 columns

  // instead of a bunch of if/else statements, I noticed a pattern
  // which allows me to insert the checker into the correct column
  // using a loop, i.e. columns 0 to 6
  for (let i = 0; i < 7; i++) {
    if (clickX >= splitWidth * i && clickX < splitWidth * (i + 1)) {
      insertChecker(i)
      break
    }
  }

  drawCheckers()
})

function drawCheckers() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      switch (grid[row][col]) {
        case undefined:
          continue
        case 'red':
          new Checker(loc_col[col], loc_row[row], 36, COLORS.RED).draw()
          break
        case 'yellow':
          new Checker(loc_col[col], loc_row[row], 36, COLORS.YELLOW).draw()
          break
      }
    }
  }
}
