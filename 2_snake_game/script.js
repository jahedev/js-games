// DOM Elements
let grid = document.getElementById('grid')

// Game Variables
let gridSize = 16
let gameEnded = false
const snakeBody = [{ x: 11, y: 11 }]

// Game Loop Variables
let lastRenderTime = 0
const SNAKE_SPEED = 2

// Generates div grid for game
function generateGrid(size) {
  grid.innerHTML = ''
  for (let row = 1; row <= size; row++) {
    grid.innerHTML += '<div class="box clear"></div>'
    for (let col = 1; col <= size; col++) {
      grid.innerHTML += '<div class="box"></div>'
    }
  }
}

function restartGame() {
  gameEnded = false
  generateGrid(gridSize)
}

function game(currentTime) {
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
}

function draw() {
  console.log('draw')
}

;(function main() {
  // Initialize Game
  generateGrid(gridSize)
  // window.requestAnimationFrame(game)
})()
