// DOM Elements
let grid = document.getElementById('grid')
let gameStatus = document.getElementById('status')

// Game Variables
let gridSize = 16
let gameEnded = false
const snakeBody = [
  { x: 10, y: 10 },
  { x: 11, y: 10 },
  { x: 12, y: 10 },
  { x: 12, y: 10 },
  { x: 13, y: 10 },
  { x: 14, y: 10 },
  { x: 15, y: 10 },
  { x: 16, y: 10 },
]

let foodPos = { x: 3, y: 3 }

const snakeColor = '#4a47a3'
const snakeHeadColor = '#eeeeee'
const foodColor = '#810000'

const MovingPos = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
}

let currMovingPos = MovingPos.LEFT

// Game Loop Variables
let lastRenderTime = 0
const SNAKE_SPEED = 10

// Generates div grid for game
function generateGrid(size) {
  grid.innerHTML = ''
  for (let row = 1; row <= size; row++) {
    for (let col = 1; col <= size; col++) {
      if (col === 1)
        grid.innerHTML += `<div class="box clear" id="r${row}c${col}"></div>`
      else grid.innerHTML += `<div class="box" id="r${row}c${col}"></div>`
    }
  }
}

function restartGame() {
  gameEnded = false
  generateGrid(gridSize)
}

function game(currentTime) {
  if (gameEnded) return
  window.requestAnimationFrame(game)

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  console.log(secondsSinceLastRender)
  lastRenderTime = currentTime

  update()
  draw()
}

function update() {
  console.log('update')

  const newX = snakeBody[0].x + currMovingPos.x
  const newY = snakeBody[0].y + currMovingPos.y
  const snakeHead = { x: newX, y: newY }

  snakeHeadCollision(snakeHead)

  if (newX <= 0 || newY <= 0 || newX > 16 || newY > 16) {
    endGame()
    return
  }

  snakeBody.unshift(snakeHead)
  snakeBody.pop()

  console.log(snakeBody)
}

function snakeHeadCollision(snakeHead) {
  snakeBody.slice(1).forEach((el) => {
    if (el.x === snakeHead.x && el.y === snakeHead.y) endGame()
  })
}

function draw() {
  console.log('draw')
  clearGrid()

  drawFood()

  let snakeHeadColored = false
  snakeBody.forEach((bodyPos) => {
    const id = `r${bodyPos.y}c${bodyPos.x}`
    const gridBox = document.getElementById(id)
    gridBox.style.backgroundColor = snakeColor
  })
}

function clearGrid() {
  grid.childNodes.forEach((el) => {
    el.style.backgroundColor = ''
  })
}

function drawFood() {
  const id = `r${foodPos.y}c${foodPos.x}`
  const gridBox = document.getElementById(id)
  gridBox.style.backgroundColor = foodColor
}

function endGame() {
  gameEnded = true
  gameStatus.innerText = 'Game Over'
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      if (currMovingPos === MovingPos.DOWN) endGame()
      currMovingPos = MovingPos.UP
      break
    case 'a':
      if (currMovingPos === MovingPos.RIGHT) endGame()
      currMovingPos = MovingPos.LEFT
      break
    case 's':
      if (currMovingPos === MovingPos.UP) endGame()
      currMovingPos = MovingPos.DOWN
      break
    case 'd':
      if (currMovingPos === MovingPos.LEFT) endGame()
      currMovingPos = MovingPos.RIGHT
      break
  }
})
;(function main() {
  // Initialize Game
  generateGrid(gridSize)
  window.requestAnimationFrame(game)
})()
