// DOM Elements
let grid = document.getElementById('grid')
let gameStatus = document.getElementById('status')
let newGameBtn = document.querySelector('button')
let showGridCheckBox = document.getElementById('showgrid')

// Game Variables
let gridSize = 16
let gameEnded = false
let snakeBody = [
  { x: 10, y: 10 },
  { x: 11, y: 10 },
]

let foodPos = { x: 4, y: 4 }

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
  generateGrid(gridSize)
  snakeBody = [
    { x: 10, y: 10 },
    { x: 11, y: 10 },
  ]
  foodPos = { x: 4, y: 4 }
  currMovingPos = MovingPos.LEFT
  newGameBtn.classList.add('hidden')
  gameEnded = false
}

function game(currentTime) {
  if (gameEnded) return
  window.requestAnimationFrame(game)

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  lastRenderTime = currentTime

  update()
  draw()
}

function update() {
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

  gameStatus.innerText = `Score: ${snakeBody.length - 2}`
}

function snakeHeadCollision(snakeHead) {
  // snakeBody collision
  snakeBody.slice(1).forEach((el) => {
    if (el.x === snakeHead.x && el.y === snakeHead.y) endGame()
  })

  // food collision
  if (foodPos.x === snakeHead.x && foodPos.y === snakeHead.y) {
    genRandomFoodLocation()
    growSnake()
  }
}

function growSnake() {
  const len = snakeBody.length
  const offsetX = snakeBody[len - 1].x - snakeBody[len - 2].x
  const offsetY = snakeBody[len - 2].y - snakeBody[len - 1].y

  const snakeTail = snakeBody[len - 1]
  const newSnakeTail = { x: snakeTail.x + offsetX, y: snakeTail.y + offsetY }

  snakeBody.push(newSnakeTail)
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

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function genRandomFoodLocation() {
  let spaceEmpty = true

  while (spaceEmpty) {
    let randX = getRandomArbitrary(1, gridSize)
    let randY = getRandomArbitrary(1, gridSize)

    const id = `r${randX}c${randY}`
    const gridBox = document.getElementById(id)

    if (gridBox.style.backgroundColor !== '') continue

    foodPos = { x: randX, y: randY }
    spaceEmpty = false
  }
}

function endGame() {
  gameEnded = true
  gameStatus.innerText = `Game Over. Score: ${snakeBody.length - 2}`
  newGameBtn.classList.remove('hidden')
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

newGameBtn.addEventListener('click', (e) => {
  restartGame()
  window.requestAnimationFrame(game)
})

showGridCheckBox.addEventListener('change', (e) => {
  let sheet = document.styleSheets[0]

  if (e.target.checked) {
    sheet.cssRules['4'].style.border = '1px solid black'
  } else {
    sheet.cssRules['4'].style.border = ''
  }
})
;(function main() {
  // Initialize Game
  generateGrid(gridSize)
})()
