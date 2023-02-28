//Base Variables
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const scoreboard = document.getElementById('scoreboard')
let score
let highScore = 0
let chosenDog = 'cattle-dog'
let playerDog = 0
canvas.width = 630
canvas.height = 630

let side = 'left'
const grid = (num) => {
    num *= 30
    return num
}

//Global Arrays & Objects
const pics = {
    dogs: [
        {name: 'cattle-dog',index: 0, left: '/sprites/cattle-dog-left.png', right: '/sprites/cattle-dog-right.png'},
        {name: 'akita',index: 1, left: '/sprites/akita-left.png', right: '/sprites/akita-right.png'},
        {name: 'beagle',index: 2, left: '/sprites/beagle-left.png', right: '/sprites/beagle-right.png'},
        {name: 'bernese-mountain-dog',index: 3, left: '/sprites/bernese-mountain-left.png', right: '/sprites/bernese-mountain-right.png'},
        {name: 'boston-terrier',index: 4, left: '/sprites/boston-terrier-left.png', right: '/sprites/boston-terrier-right.png'},
        {name: 'bull-terrier',index: 5, left: '/sprites/bull-terrier-left.png', right: '/sprites/bull-terrier-right.png'},
        {name: 'chow-chow',index: 6, left: '/sprites/chow-chow-left.png', right: '/sprites/chow-chow-right.png'},
        {name: 'corgi', index: 7, left: '/sprites/corgi-left.png', right: '/sprites/corgi-right.png'},
        {name: 'weiner-dog',index: 8, left: '/sprites/weiner-dog-left.png', right: '/sprites/weiner-dog-right.png'},
        {name: 'doberman',index: 9, left: '/sprites/doberman-left.png', right: '/sprites/doberman-right.png'},
        {name: 'german-shepard',index: 10, left: '/sprites/german-shepard-left.png', right: '/sprites/german-shepard-right.png'},
        {name: 'greyhound',index: 11, left: '/sprites/greyhound-left.png', right: '/sprites/greyhound-right.png'},
        {name: 'husky',index: 12, left: '/sprites/husky-left.png', right: '/sprites/husky-right.png'},
        {name: 'jack-russell',index: 13, left: '/sprites/jack-russell-left.png', right: '/sprites/jack-russell-right.png'},
        {name: 'pomeranian',index: 14, left: '/sprites/pomeranian-left.png', right: '/sprites/pomeranian-right.png'},
        {name: 'sheep-dog',index: 15, left: '/sprites/sheep-dog-left.png', right: '/sprites/sheep-dog-right.png'},
    ],
    cows: ['/sprites/reg-cow.png', '/sprites/brown-cow.png', '/sprites/orange-cow.png', '/sprites/black-cow.png']
}

class Snake {
    constructor (xPos,yPos) {
        this.headX = xPos
        this.headY = yPos
        this.headWidth = 28
        this.headHeight = 28
        this.length = 1
        this.img = new Image(28,28)
        this.img.src = pics.dogs[playerDog].left
        this.body = [{x: this.headX, y: this.headY}]
        this.trail = []
        this.xVel = 0
        this.yVel = 0
    }

    drawSnake () {
        movement()

        playerDog = checkPlayerDog()

        if (side === 'left') {
            this.img.src = pics.dogs[playerDog].left
        } else {
            this.img.src = pics.dogs[playerDog].right
        }

        for (let i = 0;i < this.length; i++) {
            if (i === 0) {
                ctx.drawImage(this.img, grid(this.body[i].x) + 1, grid(this.body[i].y) + 1)  
            } else {
                ctx.drawImage(roundedCattle[i].img, grid(this.body[i].x) + 1, grid(this.body[i].y) + 1)
            }
        }
    }

    organizeBody () {
        this.trail.unshift({x: this.body[0].x, y: this.body[0].y})

        if (this.trail.length > this.length) {
            this.trail.pop()
        }

        this.body = this.trail
    }
}

class Cow {
    constructor (xPos, yPos, src) {
        this.x = xPos
        this.y = yPos
        this.img = new Image
        this.img.src = src
    }
}

const snake = new Snake(10, 10)

let roundedCattle = [snake.img]

let appleArr = []

//Apple Mechanics
let apple = {
    x: undefined,
    y: undefined,
    img: new Image,
    width: 28,
    height: 28
}

const createApple = () => {
    let appleOnSnake = false
    apple.img.src = pics.cows[Math.floor(Math.random()*4)]

    apple.x = Math.floor(Math.random()*21)
    apple.y = Math.floor(Math.random()*21)

    let cow = new Cow(apple.x, apple.y, apple.img.src)
    appleArr.push(cow)

    snake.body.forEach(piece => {
        if (piece.x === apple.x && piece.y === apple.y) {
            appleOnSnake = true
        }
    });

    if (appleOnSnake === true) {
        createApple()
    }

    return apple
}

const drawApple = (apple) => {
    ctx.drawImage(apple.img, grid(apple.x) + 1, grid(apple.y) + 1)
}

const checkApple = () => {
    if (apple.x === undefined && apple.y === undefined) {createApple()}
}

//Snake Mechanics
const calcBody = (snake) => {
    let piece
    piece = {x: snake.trail[0].x, y: snake.body[0].y, img: apple.img}
    return piece
}

const snakeEats = () => {
    if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
        roundedCattle.push(appleArr.pop())
        
        apple.x = undefined; apple.y = undefined;
        snake.body.push(calcBody(snake))
        snake.length += 1
    }
}

//Movement & Event Listeners
const movement = () => {
        snake.body[0].x += snake.xVel
        snake.body[0].y += snake.yVel
        
        if (snake.body[0].x < 0) {
            snake.body[0].x = 20
        } else if (snake.body[0].x >= 21) {
            snake.body[0].x = 0
        } else if (snake.body[0].y < 0) {
            snake.body[0].y = 20
        } else if (snake.body[0].y >= 21) {
            snake.body[0].y = 0
        }
}

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'w':
            snake.xVel = 0
            snake.yVel = -1
            break;
        case 's':
            snake.xVel = 0
            snake.yVel = 1
            break;
        case 'd':
            side = 'right'
            snake.xVel = 1
            snake.yVel = 0
            break;
        case 'a':
            side = 'left'
            snake.xVel = -1
            snake.yVel = 0
            break;
    }
})

const cattleDogBtn = document.getElementById('cattle-dog-btn')
const akitaBtn = document.getElementById('akita-btn')
const beagleBtn = document.getElementById('beagle-btn')
const berneseMountainBtn = document.getElementById('bernese-mountain-btn')
const bostonTerrierBtn = document.getElementById('boston-terrier-btn')
const bullTerrierBtn = document.getElementById('bull-terrier-btn')
const chowChowBtn = document.getElementById('chow-chow-btn')
const corgiBtn = document.getElementById('corgi-btn')
const weinerDogBtn = document.getElementById('weiner-dog-btn')
const dobermanBtn = document.getElementById('doberman-btn')
const germanShepardBtn = document.getElementById('german-shepard-btn')
const greyhoundBtn = document.getElementById('greyhound-btn')
const huskyBtn = document.getElementById('husky-btn')
const jackRussellBtn = document.getElementById('jack-russell-btn')
const pomeranianBtn = document.getElementById('pomeranian-btn')
const sheepDogBtn = document.getElementById('sheep-dog-btn')

const btnClick = (btn, name) => {
    btn.onclick = () => {chosenDog = name}
}

btnClick(cattleDogBtn, 'cattle-dog')
btnClick(akitaBtn, 'akita')
btnClick(beagleBtn, 'beagle')
btnClick(berneseMountainBtn, 'bernese-mountain-dog')
btnClick(bostonTerrierBtn, 'boston-terrier')
btnClick(bullTerrierBtn, 'bull-terrier')
btnClick(chowChowBtn, 'chow-chow')
btnClick(corgiBtn, 'corgi')
btnClick(weinerDogBtn, 'weiner-dog')
btnClick(dobermanBtn, 'doberman')
btnClick(germanShepardBtn, 'german-shepard')
btnClick(greyhoundBtn, 'greyhound')
btnClick(huskyBtn, 'husky')
btnClick(jackRussellBtn, 'jack-russell')
btnClick(pomeranianBtn, 'pomeranian')
btnClick(sheepDogBtn, 'sheep-dog')

//Game Utilities
const checkPlayerDog = () => {
    const dogs = pics.dogs
    let index

    dogs.forEach(dog => {
        if (dog.name === chosenDog) {
            index = dog.index
        }
    });

    return index
}


const resetGame = () => {
    recordScore()
    postHighScore()

    snake.headX = 10
    snake.headY = 10
    snake.headWidth = 28
    snake.headHeight = 28
    snake.length = 1
    snake.body = [{x: snake.headX, y: snake.headY, img: this.img}]
    snake.trail = []
    snake.xVel = 0
    snake.yVel = 0
    side = 'left'
    snake.img.src = pics.dogs[playerDog].left

    roundedCattle = [snake.img]
    appleArr = []

    apple.x = undefined
    apple.y = undefined
    checkApple()
}

const currentScore = () => {
    score = snake.length - 1

    if (score === 0) {
        scoreboard.innerText = 'High Score: ' + highScore
    }
    else if (highScore === 0) {
        scoreboard.innerText = 'High Score: ' + ',      Current Score: ' + score
    } else {
        scoreboard.innerText = 'High Score: ' + highScore + ',      Current Score: ' + score
    }
}

const recordScore = () => {
    score = snake.length - 1

    if (score > highScore) {
        highScore = score
    }

    score = 0
}

const postHighScore = () => {
    scoreboard.innerText = 'High Score: ' + highScore
}

const endGame = () => {
    const head = snake.body[0]

    snake.body.forEach(piece => {
        if (piece != head) {
            if (head.x === piece.x && head.y === piece.y) {
                resetGame()
            }
        }
    });
}

//Game Loops
const updateGame = () => {
    endGame()
    currentScore()
    snake.organizeBody()
    snakeEats()
    checkApple()
}

const drawGame = () => { 
    ctx.fillStyle = 'rgb(2, 112, 13)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    snake.drawSnake(snake.x, snake.y)
    drawApple(apple)
}

const gameLoop = () => {
    updateGame()
    drawGame()

    fps = 8

    setTimeout(function () {
        requestAnimationFrame(gameLoop)
    }, 1000 / fps)
}

gameLoop()