let canvas = document.getElementById("snake"); // background
let context = canvas.getContext("2d");
let box = 32;
let direction = "right";
let game = setInterval(startGame, 100); // to change the snake's velocity, change the number 100 to one number less than
let pontos = 0; 

let food = { // drawing food in random mood
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let snake = []; //creating the snake as an array

snake[0] = { // put the snake in the middle of the box
    x: 8 * box,
    y: 8 * box
}

//updating the function acoording the keydowns by keyboard
document.addEventListener('keydown', update);

function update (event) {
    //moves acoording the keyboard 
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function startGame() {
    //snake moves trough the bg
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //game over
    for (i =1; i<snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert( 'Game Over :(');
        }
    }

    createBackground(); 
    createSnake();
    drawFood();

    //creating variables to save and change the snake position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    print("Pontos: " + pontos)

    // snake moves acoording to keyboard
    if (direction == "right") snakeX +=box;
    if (direction == "left") snakeX -=box;
    if (direction == "up") snakeY -=box;
    if (direction == "down") snakeY +=box;

    // if the snake's head touch the food 
    if (snakeX != food.x || snakeY != food.y){ 
        snake.pop();
        // a todo momneto uma cabeça nova é criada mas so nao da pop quando come a fruta
    } else { 
        // draw more food in a different and random place inside bg
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        pontos+=10;
    }

    //if the condition game over isnot true, the game continues creating a new head every time the anterior's if is done
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //insert the new element to the array's snake
    snake.unshift(newHead);
}

function createBackground() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (i =0; i<snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
        context.fillStyle = "red";
        context.fillRect(food.x, food.y, box, box);
}


