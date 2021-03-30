const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const imgBoard = document.getElementById('board')

canvas.width = 800
canvas.height = 600

let player1Turn = true

const COLORS = {
  WHITE: '#f6f6f6',
  BLUE: '#276678',
}

function currPlayerColor() {
  let color = player1Turn ? 'red' : 'yellow'
  player1Turn = !player1Turn
  return color
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

  static COLORS = {
    RED: '#D4252E',
    YELLOW: '#F1DE00',
  }
}

class Board {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  draw() {
    // c.beginPath()
    // c.rect(this.x, this.y, 600, 500)
    // c.fillStyle = '#D4252E'
    // c.fill()
    c.drawImage(imgBoard, 80, 80)
  }
}

class XY {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

const board = new Board(100, 100)
board.draw()

loc_col = [130, 220, 310, 400, 490, 580, 670]
loc_row = [120, 200, 280, 360, 440, 520]

grid = [
  /* grid[row][col] */
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
]

/* Puts the chekers in to the specified column and returns true.
 * If there is another checkers below, it will be placed on top.
 * If there is no space left to fill, it will return false.
 */
function insertChecker(col, color) {
  if (isNaN(col) || col < 0 || col > 7) return false

  let emptyRow = -1
  for (let row = 0; row < 6; row++) {
    // get the lowest empty row
    if (grid[row][col] === undefined) emptyRow = row
  }

  // no rows are empty
  if (emptyRow === -1) return false

  // add checkers to that row
  grid[emptyRow][col] = color
}

insertChecker(0, currPlayerColor())
insertChecker(0, currPlayerColor())
insertChecker(0, currPlayerColor())
insertChecker(1, currPlayerColor())

for (let row = 0; row < 6; row++) {
  for (let col = 0; col < 7; col++) {
    switch (grid[row][col]) {
      case undefined:
        continue
      case 'red':
        new Checker(loc_col[col], loc_row[row], 36, Checker.COLORS.RED).draw()
        break
      case 'yellow':
        new Checker(
          loc_col[col],
          loc_row[row],
          36,
          Checker.COLORS.YELLOW
        ).draw()
        break
    }
  }
}

window.addEventListener('click', (e) => {
  console.log(e.clientX, e.clientY)
})
