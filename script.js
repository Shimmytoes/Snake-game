//Initializing code here//

var canvas = document.getElementById("cheesestick");
var ctx = canvas.getContext("2d");

var growth = 3;
var gameOver = false;

//////////////////////////
// game state variables //
var WIDTH = 500;
var HEIGHT = 500;
var SIZE = 10;
var snake = []; 
snake.push([25,25]);
snake.push([20, 35]);
snake.push([15, 25]);

canvas.width = WIDTH;
canvas.height = HEIGHT;

var snakeDx = 0;
var snakeDy = 1;


var snake = [];
snake.push([25, 25]);

var apple = [];
apple.push(randomInt(1, 49));
apple.push(randomInt(1, 49));

var interval = setInterval(game, 100);

//main game loop that runs the game.
function game() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  drawShape(apple[0], apple[1]);
  
  for (var i = 0; i < snake.length; i++) {
    var segment = snake[i];
    drawShape(segment[0], segment[1], "yellow")
  }
  var head = snake[0];
  checkWalls(head[0], head[1]);

  checkApple(head[0], head[1]);
  checkWalls(head[0], head[1]);

  checkSelf(head[0], head[1]);

  if (gameOver == true){
    window.clearInterval(interval);
  }

  snake.unshift([head[0] + snakeDx, head[1] + snakeDy])

  if (growth > 0){
    growth--;
  }
  else {
    snake.pop();
  }
}

// HELPER FUNCTIONS FOR THE GAME //
// Player Controls
var UP_KEY_CODE = 38;
var DOWN_KEY_CODE = 40;
var LEFT_KEY_CODE = 37;
var RIGHT_KEY_CODE = 39;

window.onkeydown = keyDown;

function keyDown(event) {
  if (event.keyCode == UP_KEY_CODE){
   snakeDx = 0;
   snakeDy = -1;
  }
  if (event.keyCode == DOWN_KEY_CODE){
    snakeDx = 0;
   snakeDy = 1;
  }
  if (event.keyCode == LEFT_KEY_CODE){
   snakeDx = -1;
   snakeDy = 0;
  }
  if (event.keyCode == RIGHT_KEY_CODE){
    snakeDx = 1;
   snakeDy = 0;
  }
}
//draws the circles to create the snake
function drawShape(x, y, color) {
  ctx.beginPath();
  ctx.fillstyle = color;
  ctx.arc(x * SIZE, y * SIZE, SIZE, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  //your c
}

//returns a random integer between the minimum and the maximum number
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//checks if the snake is eating the apple
function checkApple(x, y) {
  if (x == apple[0] && y == apple[1]){
    growth += 3;
    apple[0] = randomInt(1, 49);
    apple[0] = randomInt(1, 49);
  }
}

//checks if the snake is touching itself, does not check the last position in the array, because that is the head.
function checkSelf(x, y) {
  for (var i = 1; i < snake.length; i++ ){
    var seg = snake[i];
    if (x == seg[0] && y == seg[1]){

      gameOver = true;
    }
  }
  }


//checks if the snake is touching a wall.
function checkWalls(x, y) {
  if (x >= 50 || x <= 0 || y >= 50 || y <= 0){
    gameOver = true;
  }
}



