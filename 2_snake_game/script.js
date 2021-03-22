// DOM Elements
let grid = document.getElementById('grid')

// Game Variables
let gridSize = 16
let gameEnded = false

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

;(function main() {
  // Initialize Game
  generateGrid(gridSize)
})()
